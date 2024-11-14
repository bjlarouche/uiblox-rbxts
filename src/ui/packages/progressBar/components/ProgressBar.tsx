import Roact from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";
import { WriteableStyle } from "theme";
import useProgressBarStyles from "./ProgressBar.styles";

export interface ProgressBarProps {
	progress: number;
	className?: WriteableStyle<Frame>;
}

function ProgressBar({ progress, className }: ProgressBarProps) {
	const { container, outer, stroke, inner, fill, corner } = useProgressBarStyles();

	return (
		<frame {...container} {...className}>
			<frame {...outer}>
				<uicorner {...corner} />
				<uistroke {...stroke} />
				<frame {...inner}>
					<uicorner {...corner} />
					<frame {...fill} Size={new UDim2(progress / 100, 0, 1, 0)}>
						<uicorner {...corner} />
					</frame>
				</frame>
			</frame>
		</frame>
	);
}

export default markPureComponent(ProgressBar);
