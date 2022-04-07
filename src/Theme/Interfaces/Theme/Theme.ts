import { Palette } from "../palette";
import { Padding, Shape, Spacing } from "../spacing";
import { ThemeTypography } from "../typography";
import ThemeOptions from "./ThemeOptions";

interface Theme {
	type: string;
	options: ThemeOptions;
	palette: Palette;
	padding: Padding;
	shape: Shape;
	spacing: Spacing;
	typography: ThemeTypography;
}

export default Theme;
