import React from "@rbxts/react";
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
	anchorPoint?: Vector2;
}

function Divider<T extends DefaultDividerComponent>(props: CustomizedProps<T, DividerProps>) {
	const { className, id, ref } = props;

	const { root } = useDividerStyles(props);

	return <frame key={id || "Divider"} ref={ref as React.Ref<Frame>} {...root} BorderSizePixel={0} {...className} />;
}

export default Divider;
