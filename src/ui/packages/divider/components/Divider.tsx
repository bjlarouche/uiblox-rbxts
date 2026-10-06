import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Orientations } from "ui/enums";
import { SxHost } from "ui/packages/host";
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
			<SxHost tag="frame" key={id || "Divider"} hostRef={ref} base={shell} className={className} sx={sx}>
				<frame key="Line" {...line} />
				<textlabel key="Label" {...caption} Text={label}>
					<uipadding {...captionPad} />
				</textlabel>
			</SxHost>
		);
	}

	return (
		<SxHost
			tag="frame"
			key={id || "Divider"}
			hostRef={ref}
			base={{ ...root, BorderSizePixel: 0 }}
			className={className}
			sx={sx}
		/>
	);
}

export default Divider;
