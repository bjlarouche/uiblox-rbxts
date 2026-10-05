import { ThemeDensity } from "../density";
import { Palette } from "../palette";
import { Padding, Shape, Spacing } from "../spacing";
import { ThemeTypography } from "../typography";
import ThemeOptions from "./ThemeOptions";

interface Theme {
	type: string;
	density: ThemeDensity;
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
		};
	};
}

export default Theme;
