import React, { useEffect, useRef } from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { loopProperty } from "ui/packages/motion";
import { LoadingStrokeStyle } from "./loadingStrokeSx";

export interface LoadingStrokeProps {
	animating?: boolean;
	color?: Color3;
	thickness?: number;
}

function LoadingStroke(props: Omit<CustomizedProps<UIStroke, LoadingStrokeProps>, "sx" | "className"> & {
	className?: LoadingStrokeStyle;
	sx?: LoadingStrokeStyle;
}) {
	const { animating = false, color, thickness = 2, className, sx, children, id, ref } = props;
	const { theme } = useTheme();
	const gradientRef = useRef<UIGradient>();
	const stroke = color ?? theme.palette.primary.on;

	useEffect(() => {
		const gradient = gradientRef.current;
		if (!gradient) return;
		if (animating) {
			gradient.Rotation = 0;
			return loopProperty(gradient, { Rotation: 360 }, 1.2);
		}
		gradient.Rotation = 0;
	}, [animating]);

	return (
		<uistroke
			key={id || "LoadingStroke"}
			ref={ref}
			Color={stroke}
			Thickness={thickness}
			ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			{...className}
			{...sx}
		>
			<uigradient
				ref={gradientRef}
				Transparency={
					new NumberSequence([
						new NumberSequenceKeypoint(0, 1),
						new NumberSequenceKeypoint(0.45, 0),
						new NumberSequenceKeypoint(0.55, 0),
						new NumberSequenceKeypoint(1, 1),
					])
				}
				Rotation={0}
				Color={new ColorSequence(stroke)}
			/>
			{children}
		</uistroke>
	);
}

export default LoadingStroke;
