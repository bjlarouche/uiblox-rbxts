import Roact, { FunctionComponent } from "@rbxts/roact";
import { Orientations } from "ui/enums";
import useDividerStyles from "./Divider.styles";

export interface DividerProps {
	position?: UDim2;
	orientation?: Orientations;
	padding?: number;
	color?: Color3;
	transparency?: number;
	weight?: number;
	className?: Partial<WritableInstanceProperties<Frame>>;
}

const Divider: FunctionComponent<DividerProps> = (props) => {
	const { className } = props;

	const { root } = useDividerStyles(props);

	return <frame Key="Divider" {...root} {...className} BorderSizePixel={0} />;
};

export default Divider;
