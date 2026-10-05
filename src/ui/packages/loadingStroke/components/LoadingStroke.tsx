import React, { useEffect, useRef } from "@rbxts/react";
import { CustomizedProps } from "theme";
import { TweenService } from "@rbxts/services";

export interface LoadingStrokeProps {
	animating?: boolean;
}

function LoadingStroke(props: CustomizedProps<UIStroke, LoadingStrokeProps>) {
	const { animating = false, className,
		sx, children, id, ref } = props;

	const gradientRef = useRef<UIGradient>();

	useEffect(() => {
		if (gradientRef.current) {
			if (animating) {
				const tween = TweenService.Create(
					gradientRef.current,
					new TweenInfo(2, Enum.EasingStyle.Linear, Enum.EasingDirection.InOut, -1, false),
					{ Rotation: 360 },
				);
				tween.Play();
				return () => tween.Destroy();
			} else {
				gradientRef.current.Rotation = 0;
			}
		}
	}, [animating]);

	// Decorative shimmer; not a semantic text/surface token.
	const stroke = Color3.fromRGB(255, 255, 255);
	const mid = Color3.fromRGB(235, 235, 235);

	return (
		<uistroke
			key={id || "LoadingStroke"}
			ref={ref}
			Color={stroke}
			Thickness={2}
			ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			{...className} {...sx}
		>
			<uigradient
				ref={gradientRef}
				Transparency={
					new NumberSequence([
						new NumberSequenceKeypoint(0, 1),
						new NumberSequenceKeypoint(0.5, 0),
						new NumberSequenceKeypoint(1, 1),
					])
				}
				Rotation={0}
				Color={
					new ColorSequence([
						new ColorSequenceKeypoint(0, stroke),
						new ColorSequenceKeypoint(0.5, mid),
						new ColorSequenceKeypoint(1, stroke),
					])
				}
			/>
			{children}
		</uistroke>
	);
}

export default LoadingStroke;
