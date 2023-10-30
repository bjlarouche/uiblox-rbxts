import Roact, { FunctionComponent } from "@rbxts/roact";
import { markPureComponent } from "@rbxts/roact-hooked";
import { WriteableStyle } from "theme";
import useProgressBarStyles from "./ProgressBar.styles";

export interface ProgressBarProps {
	progress: number;
	className?: WriteableStyle<Frame>;
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ progress, className }) => {
	const { container, outer, stroke, inner, fill, corner } = useProgressBarStyles();

	return (
		<frame Key="ProgressBar" {...container} {...className}>
			<frame Key="Bar" {...outer}>
				<uicorner Key="Corner" {...corner} />
				<uistroke {...stroke} />
				<frame {...inner}>
					<uicorner Key="Corner" {...corner} />
					<frame {...fill} Size={new UDim2(progress / 100, 0, 1, 0)}>
						<uicorner Key="Corner" {...corner} />
					</frame>
				</frame>
			</frame>
		</frame>
	);
};

export default markPureComponent(ProgressBar);
