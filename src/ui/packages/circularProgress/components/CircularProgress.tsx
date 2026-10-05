import React, { useEffect, useRef } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { CustomizedProps, useTheme } from "theme";
import { arcKeys, loopProperty, progressSpin, spinArcKeys } from "ui/packages/motion";

export interface CircularProgressProps {
	value?: number;
	size?: number;
	thickness?: number;
	color?: Color3;
	disabled?: boolean;
	reducedMotion?: boolean;
}

function CircularProgress(props: CustomizedProps<Frame, CircularProgressProps>) {
	const { value, size = 24, thickness = 3, color, disabled, reducedMotion: reducedProp, className, sx, id, ref } =
		props;
	const reducedMotion = useReducedMotion(reducedProp);
	const { theme } = useTheme();
	const indeterminate = value === undefined;
	const motion = progressSpin(indeterminate, reducedMotion, disabled);
	const gradientRef = useRef<UIGradient>();
	const tint = color ?? theme.palette.primary.main;
	const shown = indeterminate ? (motion === "spin" ? undefined : 0.25) : value;
	const transparency =
		shown === undefined
			? new NumberSequence(spinArcKeys().map((key) => new NumberSequenceKeypoint(key.time, key.transparency)))
			: new NumberSequence(arcKeys(shown).map((key) => new NumberSequenceKeypoint(key.time, key.transparency)));

	useEffect(() => {
		const gradient = gradientRef.current;
		if (!gradient) return;
		if (motion === "spin") {
			gradient.Rotation = 0;
			return loopProperty(gradient, { Rotation: 360 }, 1);
		}
		gradient.Rotation = -90;
	}, [motion]);

	return (
		<frame
			key={id || "CircularProgress"}
			ref={ref}
			Size={new UDim2(0, size, 0, size)}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			{...className}
			{...sx}
		>
			<uicorner CornerRadius={new UDim(1, 0)} />
			<uistroke Color={tint} Thickness={thickness} Transparency={disabled ? 0.85 : 0.82} />
			<uistroke Color={tint} Thickness={thickness} Transparency={disabled ? 0.55 : 0}>
				<uigradient ref={gradientRef} Rotation={-90} Transparency={transparency} Color={new ColorSequence(tint)} />
			</uistroke>
		</frame>
	);
}

export default CircularProgress;
