/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/types" />
/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { CustomizedProps } from "../../../../theme";
import { InputColor, InputMargin, InputVariant } from "../types";
export type DefaultInputComponent = Frame;
export interface InputProps {
    color?: InputColor;
    disabled?: boolean;
    hasError?: boolean;
    helperText?: string;
    margin?: InputMargin;
    variant?: InputVariant;
    width?: UDim;
    text?: string;
    placeholder?: string;
    rounded?: boolean;
    clearsTextOnFocus?: boolean;
    onTextChanged?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    onEnterPressed?: (text: string) => void;
}
declare function Input(props: CustomizedProps<DefaultInputComponent, InputProps>): Roact.Element;
declare const _default: typeof Input;
export default _default;
