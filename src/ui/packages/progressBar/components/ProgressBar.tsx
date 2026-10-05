import React, { useEffect, useRef } from "@rbxts/react";
import { useReducedMotion } from "hooks";
import { CustomizedProps, useTheme } from "theme";
import { loopProperty, progressSpin, progressUnit } from "ui/packages/motion";
import useProgressBarStyles from "./ProgressBar.styles";

export interface ProgressBarProps {
	progress?: number;
	value?: number;
	indeterminate?: boolean;
	disabled?: boolean;
	reducedMotion?: boolean;
	color?: Color3;
}

function ProgressBar(props: CustomizedProps<Frame, ProgressBarProps>) {
	const { progress, value, indeterminate = false, disabled, reducedMotion: reducedProp, color, className,
		sx, id, ref } = props;
	const reducedMotion = useReducedMotion(reducedProp);
	const { theme } = useTheme();
	const { container, outer, stroke, inner, fill, corner } = useProgressBarStyles();
	const barRef = useRef<Frame>();
	const unit = indeterminate ? 0.35 : progressUnit(value, progress);
	const motion = progressSpin(indeterminate, reducedMotion, disabled);

	useEffect(() => {
		const bar = barRef.current;
		if (!bar) return;
		if (motion !== "spin") {
			bar.Position = new UDim2(0, 0, 0.5, 0);
			return;
		}
		bar.Position = new UDim2(-unit, 0, 0.5, 0);
		return loopProperty(bar, { Position: new UDim2(1, 0, 0.5, 0) }, 1.1);
	}, [motion, unit]);

	return (
		<frame key={id || "ProgressBar"} ref={ref} {...container} {...className} {...sx}>
			<frame key="Bar" {...outer}>
				<uicorner key="Corner" {...corner} />
				<uistroke {...stroke} />
				<frame {...inner}>
					<uicorner key="Corner" {...corner} />
					<frame
						ref={barRef}
						{...fill}
						Size={new UDim2(unit, 0, 1, 0)}
						BackgroundColor3={color ?? theme.palette.text.primary}
						BackgroundTransparency={disabled ? 0.55 : 0}
					>
						<uicorner key="Corner" {...corner} />
					</frame>
				</frame>
			</frame>
		</frame>
	);
}

export default ProgressBar;
export { ProgressBar as LinearProgress };
export type LinearProgressProps = ProgressBarProps;
