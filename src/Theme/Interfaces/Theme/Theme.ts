import { Palette } from "../Palette";
import { Padding, Shape, Spacing } from "../Spacing";
import { Typography } from "../Typography";
import ThemeOptions from "./ThemeOptions";

interface Theme {
	type: string;
	options: ThemeOptions;
	palette: Palette;
	padding: Padding;
	shape: Shape;
	spacing: Spacing;
	typography: Typography;
}

export default Theme;
