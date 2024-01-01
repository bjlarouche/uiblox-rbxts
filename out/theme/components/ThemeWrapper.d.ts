/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { Theme } from "../interfaces/Theme";
export interface ThemeWrapperProps {
    theme?: Theme;
}
declare function ThemeWrapper(props: Roact.PropsWithChildren<ThemeWrapperProps>): Roact.Element;
declare const _default: typeof ThemeWrapper;
export default _default;
