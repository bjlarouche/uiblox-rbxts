/// <reference types="roact" />
import Roact from "@rbxts/roact";
import { Theme } from "../interfaces/Theme";
export interface ThemeProviderProps {
    theme?: Theme;
}
declare function ThemeProvider(props: Roact.PropsWithChildren<ThemeProviderProps>): Roact.Element;
declare const _default: typeof ThemeProvider;
export default _default;
