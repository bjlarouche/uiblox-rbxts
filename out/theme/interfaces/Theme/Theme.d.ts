import { Palette } from "../Palette";
import { Padding, Shape, Spacing } from "../Spacing";
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
