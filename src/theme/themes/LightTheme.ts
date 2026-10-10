import { allFontSizes } from "../interfaces/typography/FontSizes";
import { Theme } from "../interfaces/theme";
import {
	BORDER_RADIUS,
	CONTENT_WIDTH,
	ICON_SIZES,
	MOTION,
	PADDING_BASE,
	PILL_SCALE,
	RADIUS,
	SPACING_BASE,
} from "theme/constants/NumberConstants";
import { DEFAULT_BORDERS } from "theme/constants/ColorConstants";
import { allFontFamilies } from "../interfaces/typography/FontFamilies";
import { allTypographyVariants } from "../interfaces/typography/Variants";
import { createLightPalette } from "./createPalette";

const LightTheme: Theme = {
	type: "Light",
	density: "comfortable",
	motion: MOTION,
	palette: createLightPalette(),
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
		radius: RADIUS,
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

export default LightTheme;
