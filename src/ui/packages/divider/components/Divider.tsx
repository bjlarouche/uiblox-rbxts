import Roact from "@rbxts/roact";
import { CustomizedProps } from "theme";
import { Orientations } from "ui/enums";
import useDividerStyles from "./Divider.styles";

type DefaultDividerComponent = Frame;

export interface DividerProps {
	position?: UDim2;
	orientation?: Orientations;
	padding?: number;
	color?: Color3;
	transparency?: number;
	weight?: number;
}

function Divider<T extends DefaultDividerComponent>(props: CustomizedProps<T, DividerProps>) {
	const { className } = props;

	const { root } = useDividerStyles(props);

	return <frame Key="Divider" {...root} BorderSizePixel={0} {...className} />;
}

export default Divider;
