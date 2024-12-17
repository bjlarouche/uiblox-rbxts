import React, { useState, useMemo, ComponentType, useEffect } from "@rbxts/react";
import { useAsyncEffect, useDeferState } from "@rbxts/pretty-react-hooks";
import { ContentProvider } from "@rbxts/services";
import { ProgressBar } from "ui/packages/progressBar";
import { CustomizedProps } from "theme";
import usePreloaderStyles from "./Preloader.styles";

export interface PreloaderAssets {
	[key: string]: string | PreloaderAssets;
}

export interface CustomAdornmentProps {
	progress: number;
}

export interface PreloaderProps {
	preloaderAssets: Map<string, PreloaderAssets>;
	icon?: string;
	showPercentage?: boolean;
	loaderPrecision?: number;
	hideProgressBar?: boolean;
	showAssetName?: boolean;
	adornment?: ComponentType<CustomAdornmentProps>;
}

function Preloader(props: CustomizedProps<Frame, PreloaderProps>) {
	const {
		preloaderAssets,
		icon,
		showPercentage = false,
		loaderPrecision = 0,
		hideProgressBar = false,
		showAssetName = false,
		adornment: Adornment,
		className,
		children,
		key,
	} = props;
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
				return math.clamp(prev + unit, 0, 100);
			});
		});

		setCurrentAsset(undefined);
	}, []);

	useEffect(() => {
		if (math.round(percentage) >= 100) {
			setLoaded(true);
		}
	}, [percentage]);

	const percentageStr = useMemo(() => {
		if (!showPercentage) {
			return undefined;
		}

		return `${string.format(`%.${loaderPrecision}f`, math.round(percentage))}%`;
	}, [showPercentage, loaderPrecision, percentage]);

	return (
		<>
			{loaded ? (
				{ children }
			) : (
				<frame key={key || "Preloader"} {...container} {...className}>
					{Adornment !== undefined && <Adornment progress={percentage} />}

					{icon !== undefined && <imagelabel {...logo} />}

					{!hideProgressBar && (
						<>
							<textlabel
								{...label}
								Text={`Loading ${currentAsset !== undefined ? currentAsset : "resources"}... ${percentageStr}`}
							/>
							<ProgressBar className={progressBar} progress={percentage} />
						</>
					)}
				</frame>
			)}
		</>
	);
}

export default Preloader;
