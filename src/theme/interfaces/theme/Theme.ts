import { ThemeDensity } from "../density";
import { Palette } from "../palette";
import { Padding, Shape, Spacing } from "../spacing";
import { ThemeTypography } from "../typography";
import ThemeOptions from "./ThemeOptions";

interface Theme {
	type: string;
	density: ThemeDensity;
	reducedMotion?: boolean;
	/** Tween seconds: focus and hover, menus and disclosure, sheets and snackbars. */
	motion: { fast: number; default: number; slow: number };
	options: ThemeOptions;
	palette: Palette;
	padding: Padding;
	shape: Shape;
	spacing: Spacing;
	typography: ThemeTypography;
	components?: {
		[name: string]: {
			defaultProps?: { [key: string]: unknown };
			styleOverrides?: { [slot: string]: object };
			variants?: { [prop: string]: { [value: string]: { [slot: string]: object } } };
			compoundVariants?: Array<{ when: { [prop: string]: unknown }; styles: { [slot: string]: object } }>;
		};
	};
}

export default Theme;
