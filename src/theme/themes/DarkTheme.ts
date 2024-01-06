import { allFontSizes } from "../interfaces/typography/FontSizes";
import {
	Blue,
	Gray,
	Dark,
	Light,
	Common,
	Red,
	Green,
	Yellow,
	Purple,
	Magenta,
	Orange,
	Turquoise,
} from "../interfaces/Palette/Colors";
import { Theme } from "../interfaces/Theme";
import {
	BORDER_RADIUS,
	DARK_THEME_COLORS,
	PADDING_BASE,
	SPACING_BASE,
	CONTENT_WIDTH,
	ICON_SIZES,
	DEFAULT_BORDERS,
} from "../constants";
import { allFontFamilies } from "../interfaces/typography/FontFamilies";

const DarkTheme: Theme = {
	type: "Dark",
	palette: {
		error: {
			main: Red[50],
		},
		primary: {
			main: Green[50],
		},
		secondary: {
			main: Blue[50],
		},
		success: {
			main: Green[50],
		},
		text: {
			primary: Common.White,
			secondary: Dark[70],
		},
		divider: Gray[70],
		background: {
			default: Common.Black,
			paper: Gray[90],
		},
		warning: {
			main: Yellow[50],
		},
	},
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
	},
	typography: {
		fontSizes: allFontSizes,
		fontFamilies: allFontFamilies,
	},
	options: {
		constants: {
			contentWidth: CONTENT_WIDTH,
			iconSizes: ICON_SIZES,
			colors: DARK_THEME_COLORS,
			borders: DEFAULT_BORDERS,
			extendedPalette: {
				Blue,
				Common,
				Dark,
				Gray,
				Green,
				Light,
				Magenta,
				Orange,
				Purple,
				Red,
				Turquoise,
				Yellow,
			},
		},
	},
};

export default DarkTheme;
