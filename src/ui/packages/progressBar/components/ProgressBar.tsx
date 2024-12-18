import React from "@rbxts/react";
import { CustomizedProps, WriteableStyle } from "theme";
import useProgressBarStyles from "./ProgressBar.styles";

export interface ProgressBarProps {
	progress: number;
}

function ProgressBar(props: CustomizedProps<Frame, ProgressBarProps>) {
	const { progress, className, id, ref } = props;

	const { container, outer, stroke, inner, fill, corner } = useProgressBarStyles();

	return (
		<frame key={id || "ProgressBar"} ref={ref} {...container} {...className}>
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
