import { ColorTokens } from "../Palette/ColorTokens/ColorTokens";
import { CommonColors } from "../Palette/Colors/Common";
import { Colors } from "../Palette/Colors";
import { IconSizes } from "../IconSizes";
import { Borders } from "../Spacing";

export default interface ThemeConstants {
	contentWidth: number;
	iconSizes: IconSizes;
	colors: Colors;
	borders: Borders;
	extendedPalette: {
		Blue: ColorTokens;
		Common: CommonColors;
		Dark: ColorTokens;
		Gray: ColorTokens;
		Green: ColorTokens;
		Light: ColorTokens;
		Magenta: ColorTokens;
		Orange: ColorTokens;
		Purple: ColorTokens;
		Red: ColorTokens;
		Turquoise: ColorTokens;
		Yellow: ColorTokens;
	};
}
