import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Orientations } from "ui/enums";
import { dividerLabel } from "./dividerLabel";
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
	text?: string;
}

function Divider<T extends DefaultDividerComponent>(props: CustomizedProps<T, DividerProps>) {
	const { text, orientation, className,
		sx, id, ref } = props;

	const { root, shell, line, caption, captionPad } = useDividerStyles(props);
	const label = dividerLabel(text);
	if (label !== undefined && orientation !== Orientations.Vertical) {
		return (
			<frame key={id || "Divider"} ref={ref as React.Ref<Frame>} {...shell} {...className} {...sx}>
				<frame key="Line" {...line} />
				<textlabel key="Label" {...caption} Text={label}>
					<uipadding {...captionPad} />
				</textlabel>
			</frame>
		);
	}

	return <frame key={id || "Divider"} ref={ref as React.Ref<Frame>} {...root} BorderSizePixel={0} {...className} {...sx} />;
}

export default Divider;
