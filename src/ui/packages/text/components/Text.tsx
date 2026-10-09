import React from "@rbxts/react";
import { CustomizedProps, useTheme } from "theme";
import { SxHost } from "ui/packages/host";
import { textBox } from "./textBox";

export interface TextProps {
	text?: string;
	wrap?: boolean;
}

function Text(props: CustomizedProps<TextLabel, TextProps>) {
	const { text = "", wrap, className, sx, id, ref } = props;
	const { theme } = useTheme();
	const box = textBox(wrap);
	return (
		<SxHost
			tag="textlabel"
			key={id || "Text"}
			hostRef={ref}
			base={{
				Text: text,
				Size: new UDim2(box.widthScale, 0, box.heightScale, 0),
				AutomaticSize: box.automatic === "Y" ? Enum.AutomaticSize.Y : Enum.AutomaticSize.XY,
				TextWrapped: box.wrapped,
				TextXAlignment: Enum.TextXAlignment.Left,
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.body,
				TextColor3: theme.palette.text.primary,
				...className,
			}}
			sx={sx}
		/>
	);
}

export default Text;
