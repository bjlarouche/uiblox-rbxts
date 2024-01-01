/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { CustomizedProps } from "../../../../theme";
import { ButtonSize, ButtonColor, ButtonVariant } from "../types";
export type DefaultButtonComponent = TextButton;
export interface ButtonProps {
    text?: string;
    size?: ButtonSize;
    color?: ButtonColor;
    fullWidth?: boolean;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    rounded?: boolean;
    hoveringDisabled?: boolean;
    onLeftClick?: () => void;
    onLeftDown?: () => void;
    onLeftUp?: () => void;
    onRightClick?: () => void;
    onRightDown?: () => void;
    onRightUp?: () => void;
    mouseEnter?: () => void;
    mouseLeave?: () => void;
}
declare function Button(props: Roact.PropsWithChildren<CustomizedProps<DefaultButtonComponent, ButtonProps>>): Roact.Element;
declare const _default: typeof Button;
export default _default;
