import React, { useEffect, useRef } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import { loopProperty } from "ui/packages/motion";
import useSkeletonStyles from "./Skeleton.styles";
import { SkeletonAnimation, skeletonLineWidth, skeletonMotion } from "./skeletonMotion";

export type SkeletonVariant = "text" | "rectangular" | "rounded" | "circular";

export interface SkeletonProps {
	variant?: SkeletonVariant;
	width?: number;
	height?: number;
	lines?: number;
	gap?: number;
	animation?: SkeletonAnimation;
	reducedMotion?: boolean;
}

function SkeletonBlock(
	props: CustomizedProps<Frame, SkeletonProps> & { width: number; height: number; motion: SkeletonAnimation },
) {
	const { variant = "text", width, height, motion, className, sx, id, ref } = props;
	const { block, highlight, rounded, circular } = useSkeletonStyles();
	const fillRef = useRef<Frame>();
	const gradientRef = useRef<UIGradient>();
	const showGradient = motion !== "pulse";

	useEffect(() => {
		const fill = fillRef.current;
		const gradient = gradientRef.current;
		if (!fill) return;
		if (motion === "shimmer" && gradient) {
			gradient.Offset = new Vector2(-1, 0);
			return loopProperty(gradient, { Offset: new Vector2(1, 0) }, 1.2);
		}
		if (motion === "pulse") {
			fill.BackgroundTransparency = 0;
			return loopProperty(fill, { BackgroundTransparency: 0.45 }, 0.9, true);
		}
		fill.BackgroundTransparency = 0;
		if (gradient) gradient.Offset = new Vector2(0, 0);
	}, [motion]);

	const corner = variant === "circular" ? circular : variant === "rectangular" ? undefined : rounded;
	const side = variant === "circular" ? width : undefined;

	return (
		<SxHost
			tag="frame"
			key={id || "Skeleton"}
			hostRef={ref}
			base={{
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				AutomaticSize: Enum.AutomaticSize.None,
				ClipsDescendants: true,
			}}
			className={className}
			sx={sx}
			Size={new UDim2(0, side ?? width, 0, side ?? height)}
		>
			<frame ref={fillRef} {...block} Size={new UDim2(1, 0, 1, 0)}>
				{showGradient && <uigradient ref={gradientRef} {...highlight} />}
				{corner !== undefined && <uicorner {...corner} />}
			</frame>
		</SxHost>
	);
}

function Skeleton(props: CustomizedProps<Frame, SkeletonProps>) {
	const {
		variant = "text",
		width = variant === "circular" ? 40 : 160,
		height = variant === "text" ? 14 : 40,
		lines = 1,
		gap = 8,
		animation,
		reducedMotion: reducedProp,
		className,
		sx,
		id,
		ref,
	} = props;
	const reducedMotion = useReducedMotion(reducedProp);
	const motion = skeletonMotion(animation, reducedMotion);
	const count = variant === "text" ? math.max(lines, 1) : 1;

	if (count <= 1) {
		return (
			<SkeletonBlock
				variant={variant}
				width={width}
				height={height}
				motion={motion}
				className={className}
				sx={sx}
				id={id}
				ref={ref}
			/>
		);
	}

	const rows = new Array<number>();
	for (let index = 0; index < count; index++) rows.push(index);
	const blockHeight = height * count + gap * (count - 1);

	return (
		<SxHost
			tag="frame"
			key={id || "Skeleton"}
			hostRef={ref}
			className={className}
			sx={sx}
			Size={new UDim2(0, width, 0, blockHeight)}
			AutomaticSize={Enum.AutomaticSize.None}
			ClipsDescendants={true}
			BackgroundTransparency={1}
			BorderSizePixel={0}
		>
			<uilistlayout
				Padding={new UDim(0, gap)}
				FillDirection={Enum.FillDirection.Vertical}
				SortOrder={Enum.SortOrder.LayoutOrder}
			/>
			<>
			{rows.map((index) => (
				<SkeletonBlock
					key={`line-${index}`}
					variant="text"
					width={skeletonLineWidth(width, index, count)}
					height={height}
					motion={motion}
				/>
			))}
			</>
		</SxHost>
	);
}

export function SkeletonText(props: CustomizedProps<Frame, Omit<SkeletonProps, "variant">>) {
	return <Skeleton {...props} variant="text" />;
}

export default Skeleton;
