import { allFontSizes } from "../interfaces/typography/FontSizes";
import { Theme } from "../interfaces/theme";
import {
	BORDER_RADIUS,
	CONTENT_WIDTH,
	ICON_SIZES,
	PADDING_BASE,
	PILL_SCALE,
	SPACING_BASE,
} from "theme/constants/NumberConstants";
import { DEFAULT_BORDERS } from "theme/constants/ColorConstants";
import { allFontFamilies } from "../interfaces/typography/FontFamilies";
import { allTypographyVariants } from "../interfaces/typography/Variants";
import { createDarkPalette } from "./createPalette";

const DarkTheme: Theme = {
	type: "Dark",
	density: "comfortable",
	palette: createDarkPalette(),
	spacing: {
		default: SPACING_BASE,
		calc: (value: number) => SPACING_BASE * value,
	},
	padding: {
		default: PADDING_BASE,
		calc: (value: number) => PADDING_BASE * value,
	},
	shape: {
		borderRadius: BORDER_RADIUS,
		pillScale: PILL_SCALE,
	},
	typography: {
		fontSizes: allFontSizes,
		fontFamilies: allFontFamilies,
		variants: allTypographyVariants,
	},
	options: {
		constants: {
			contentWidth: CONTENT_WIDTH,
			iconSizes: ICON_SIZES,
			borders: DEFAULT_BORDERS,
		},
	},
};

export default DarkTheme;
