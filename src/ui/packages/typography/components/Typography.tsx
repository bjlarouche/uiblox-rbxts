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
	lineClamp?: number;
	token?: Tokens;
}

type DefaultTypographyComponent = TextLabel;

function Typography<T extends DefaultTypographyComponent>(props: CustomizedProps<T, TypographyProps>) {
	const {
		className,
		variant = "body",
		family = "default",
		color = "initial",
		display,
		align,
		noWrap,
		lineClamp,
		token,
		component,
		[Roact.Children]: children,
	} = props;

	const { root, variantToken } = useTypographyStyles(props);

	return (
		<textlabel
			Key={"Typography"}
			{...className}
			{...root}
			{...variantToken}
			// TextSize={variant && DefaultTheme.typography.fontSizes[variant]}
			// Font={family && DefaultTheme.typography.fontFamilies[family]}
			TextColor3={color && COLOR_TO_PALETTE(color)}
			// TODO: Display
			// TODO: Align
			// TODO: LineClamp
			// TODO: Token
			TextWrapped={!noWrap}
		>
			{children}
		</textlabel>
	);
}

export default Typography;
