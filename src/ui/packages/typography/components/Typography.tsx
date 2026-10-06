import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { FontFamilyVariant, FontSizeVariant } from "theme/interfaces/typography";
import { SxHost } from "ui/packages/host";
import { TypographyAlignment } from "../types/TypographyAlignment";
import { TypographyColor } from "../types/TypographyColor";
import { TypographyDisplay } from "../types/TypographyDisplay";
import useTypographyStyles from "./Typography.styles";

type DefaultTypographyComponent = TextLabel;

export interface TypographyProps {
	text?: string;
	variant?: FontSizeVariant;
	family?: FontFamilyVariant;
	color?: TypographyColor;
	display?: TypographyDisplay;
	align?: TypographyAlignment;
	noWrap?: boolean;
	lineClamp?: boolean;
}

function Typography<T extends DefaultTypographyComponent>(props: CustomizedProps<T, TypographyProps>) {
	const { text = "", className,
		sx, children, id, ref } = props;

	const { root, variantToken } = useTypographyStyles(props);

	return (
		<SxHost
			tag="textlabel"
			key={id || "Typography"}
			hostRef={ref}
			base={{ ...root, Text: text, ...className, ...variantToken }}
			sx={sx}
		>
			{children}
		</SxHost>
	);
}

export default Typography;
