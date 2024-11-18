import React from "@rbxts/react";
import { WriteableStyle } from "theme";
import useProgressBarStyles from "./ProgressBar.styles";

export interface ProgressBarProps {
	progress: number;
	className?: WriteableStyle<Frame>;
}

function ProgressBar({ progress, className }: ProgressBarProps) {
	const { container, outer, stroke, inner, fill, corner } = useProgressBarStyles();

	return (
		<frame key="ProgressBar" {...container} {...className}>
			<frame key="Bar" {...outer}>
				<uicorner key="Corner" {...corner} />
				<uistroke {...stroke} />
				<frame {...inner}>
					<uicorner key="Corner" {...corner} />
					<frame {...fill} Size={new UDim2(progress / 100, 0, 1, 0)}>
						<uicorner key="Corner" {...corner} />
					</frame>
				</frame>
			</frame>
		</frame>
	);
}

export default ProgressBar;
