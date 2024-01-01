/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { CustomizedProps } from "../../../../theme";
import { FontFamilyVariant, FontSizeVariant } from "../../../../theme/interfaces/typography";
import { TypographyAlignment } from "../types/TypographyAlignment";
import { TypographyColor } from "../types/TypographyColor";
import { TypographyDisplay } from "../types/TypographyDisplay";
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
declare function Typography<T extends DefaultTypographyComponent>(props: CustomizedProps<T, TypographyProps>): Roact.Element;
export default Typography;
