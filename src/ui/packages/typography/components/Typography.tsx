import Roact from "@rbxts/roact";
import { CustomizedProps } from "theme";
import { FontFamilyVariant, FontSizeVariant } from "theme/interfaces/typography";
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
	const { text = "", className, children } = props;

	const { root, variantToken } = useTypographyStyles(props);

	return (
		<textlabel {...root} Text={text} {...className} {...variantToken}>
			{children}
		</textlabel>
	);
}

export default Typography;
