/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { Icons } from "../../../enums";
import { CustomizedProps } from "../../../../theme";
export interface IconProps {
    icon: Icons;
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
    tint?: Color3;
}
type DefaultIconComponent = ImageLabel;
declare function Icon(props: CustomizedProps<DefaultIconComponent, IconProps>): Roact.Element;
declare const _default: typeof Icon;
export default _default;
