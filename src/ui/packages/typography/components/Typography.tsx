import Roact from "@rbxts/roact";
import { CustomizedProps, Tokens } from "theme";
import { FontFamilyVariant, FontSizeVariant } from "theme/interfaces/typography";
import { COLOR_TO_PALETTE } from "../maps/PropMap";
import { TypographyAlignment } from "../types/TypographyAlignment";
import { TypographyColor } from "../types/TypographyColor";
import { TypographyDisplay } from "../types/TypographyDisplay";
import useTypographyStyles from "./Typography.styles";

export interface TypographyProps {
	variant?: FontSizeVariant;
	family?: FontFamilyVariant;
	color?: TypographyColor;
	display?: TypographyDisplay;
	align?: TypographyAlignment;
	noWrap?: boolean;
}

type DefaultTypographyComponent = TextLabel;

function Typography<T extends DefaultTypographyComponent>(props: CustomizedProps<T, TypographyProps>) {
	const { className, [Roact.Children]: children } = props;

	const { root, variantToken } = useTypographyStyles(props);

	return (
		<textlabel Key={"Typography"} {...className} {...root} {...variantToken}>
			{children}
		</textlabel>
	);
}

export default Typography;
