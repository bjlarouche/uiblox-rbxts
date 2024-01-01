/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { Icons } from "../../../enums";
import { CustomizedProps } from "../../../../theme";
export interface IconButtonProps {
    icon: Icons;
    size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
    tint: Color3;
    selected?: boolean;
    onClick?: () => void;
}
type DefaultIconButtonComponent = ImageButton;
declare function IconButton(props: CustomizedProps<DefaultIconButtonComponent, IconButtonProps>): Roact.Element;
declare const _default: typeof IconButton;
export default _default;
