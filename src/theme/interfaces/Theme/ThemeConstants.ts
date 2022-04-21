import { ColorTokens } from "../palette/colorTokens/ColorTokens";
import { CommonColors } from "../palette/colors/Common";
import { Colors } from "../palette/colors";
import { Borders } from "../spacing";
import { IconSizes } from "../iconSizes";

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
