/// <reference types="roact" />
import Roact from "@rbxts/roact";
import ToastVariants from "../enums/ToastVariants";
export interface ToastProps {
    text: string;
    onDismiss: () => void;
    duration?: number;
    variant?: ToastVariants;
    toggledAt?: number;
}
declare function Toast(props: ToastProps): Roact.Element;
declare const _default: typeof Toast;
export default _default;
