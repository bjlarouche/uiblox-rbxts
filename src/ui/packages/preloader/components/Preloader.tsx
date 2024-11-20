import React, { useState, useMemo } from "@rbxts/react";
import { useAsyncEffect, useDeferState } from "@rbxts/pretty-react-hooks";
import { ContentProvider } from "@rbxts/services";
import { ProgressBar } from "ui/packages/progressBar";
import { CustomizedProps } from "theme";
import usePreloaderStyles from "./Preloader.styles";

export interface PreloaderAssets {
	[key: string]: string | PreloaderAssets;
}

export interface PreloaderProps {
	preloaderAssets: Map<string, PreloaderAssets>;
	icon?: string;
	showPercentage?: boolean;
	loaderPrecision?: number;
	showAssetName?: boolean;
}

function Preloader(props: CustomizedProps<Frame, PreloaderProps>) {
	const { preloaderAssets, showPercentage = false, loaderPrecision = 0, showAssetName = false, children } = props;
	const [percentage, setPercentage] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const { container, logo, label, progressBar } = usePreloaderStyles(props);

	const [contentIds, contentNamesById] = useMemo(() => {
		const contentIds: string[] = [];
		const contentNamesById = new Map<string, string>();

		const scan = (assets: PreloaderAssets, prefix = "") => {
			for (const [name, asset] of pairs(assets)) {
				if (typeIs(asset, "string")) {
					contentIds.push(asset);
					contentNamesById.set(asset, `${prefix}${showAssetName ? `/${name}` : ""}`);
				} else {
					scan(asset, `${prefix}${showAssetName ? `/${name}` : ""}`);
				}
			}
		};

		preloaderAssets.forEach((assets, category) => {
			scan(assets, `${category}`);
		});

		return [contentIds, contentNamesById] as const;
	}, []);

	const [currentAsset, setCurrentAsset] = useDeferState<string>();

	useAsyncEffect(async () => {
		const unit = (1 / contentIds.size()) * 100;
		ContentProvider.PreloadAsync(contentIds, (assetId) => {
			setCurrentAsset(contentNamesById.get(assetId));

			setPercentage((prev) => {
				const newPercentage = math.round(math.clamp(prev + unit, 0, 100));

				if (newPercentage === 100) {
					setLoaded(true);
				}

				return newPercentage;
			});
		});

		setCurrentAsset(undefined);
	}, []);

	return (
		<>
			{loaded ? (
				{ children }
			) : (
				<frame key={"Preloader"} {...container}>
					<imagelabel {...logo} />
					<textlabel
						{...label}
						Text={`Loading ${currentAsset !== undefined ? currentAsset : "resources"}... ${
							showPercentage ? string.format(`%.${loaderPrecision}f\%`, percentage) : ""
						}`}
					/>
					<ProgressBar className={progressBar} progress={percentage} />
				</frame>
			)}
		</>
	);
}

export default Preloader;
