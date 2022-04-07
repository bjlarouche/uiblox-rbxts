import Roact from "@rbxts/roact";
import { hooked } from "@rbxts/roact-hooked";
import useProgressBarStyles from "./ProgressBar.styles";

export interface ProgressBarProps {
	progress: number;
	className?: Partial<WritableInstanceProperties<Frame>>;
}

const ProgressBar = hooked<ProgressBarProps>(({ progress, className }) => {
	const { container, outer, stroke, inner, fill, corner } = useProgressBarStyles();

	return (
		<frame Key="ProgressBar" {...container} {...className}>
			<frame {...outer}>
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
});

export default ProgressBar;
