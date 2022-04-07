import Roact, { FunctionComponent } from "@rbxts/roact";
import { Orientations } from "ui/enums";

interface DividerProps {
	position?: UDim2;
	orientation?: Orientations;
	padding?: number;
	color?: Color3;
	transparency?: number;
	weight?: number;
	className?: Partial<WritableInstanceProperties<Frame>>;
}

const Divider: FunctionComponent<DividerProps> = ({
	position,
	orientation = Orientations.Horizontal,
	padding = 0,
	color,
	transparency = 0,
	weight = 1,
	className,
}) => {
	return (
		<frame
			Key="Divider"
			{...className}
			Position={position ?? className?.Position ?? new UDim2(0, 0, 0, 0)}
			Size={
				new UDim2(
					orientation === Orientations.Horizontal ? 1 : 0,
					orientation === Orientations.Horizontal ? -padding * 2 : weight,
					orientation === Orientations.Vertical ? 1 : 0,
					orientation === Orientations.Vertical ? -padding * 2 : weight,
				)
			}
			BackgroundColor3={color || Color3.fromRGB(255, 255, 255)}
			BackgroundTransparency={transparency}
			BorderSizePixel={0}
		/>
	);
};

export default Divider;
