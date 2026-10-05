import { Blue, Common, Gray, Green, Purple, Red, Yellow } from "../interfaces/palette/colors";
import { Palette } from "../interfaces/palette";
import { lighten, mix } from "../utilites/colorMath";

const brand = (main: Color3, on: Color3, hover: Color3, pressed: Color3) => ({
	main,
	on,
	hover,
	pressed,
});

const status = (main: Color3, on: Color3, surface: Color3, border: Color3) => ({
	main,
	on,
	surface,
	border,
});

export const createLightPalette = (): Palette => {
	const primaryMain = Blue[80];
	const accentMain = Purple[70];

	return {
		surface: {
			canvas: Common.White,
			paper: Gray[20],
			elevated: Common.White,
			overlay: Common.White,
			input: Common.White,
		},
		primary: brand(primaryMain, Common.White, Blue[70], Blue[90]),
		accent: brand(accentMain, Common.White, Purple[60], Purple[80]),
		text: {
			primary: Common.Black,
			secondary: Gray[70],
			disabled: Gray[60],
			inverse: Common.White,
			link: Blue[80],
		},
		border: Gray[70],
		divider: Gray[50],
		focus: Blue[80],
		action: {
			hover: mix(Gray[40], Common.White, 0.35),
			pressed: Gray[40],
			selected: Blue[10],
			disabled: Gray[60],
		},
		status: {
			success: status(Green[90], Common.White, Green[10], Green[80]),
			warning: status(Yellow[100], Common.White, Yellow[10], Yellow[90]),
			error: status(Red[80], Common.White, Red[10], Red[70]),
			info: status(Blue[90], Common.White, Blue[10], Blue[80]),
		},
		backdrop: Common.Black,
		shadow: Common.Black,
	};
};

export const createDarkPalette = (): Palette => {
	const primaryMain = Blue[50];
	const accentMain = Purple[40];

	return {
		surface: {
			canvas: Common.Black,
			paper: Gray[100],
			elevated: Gray[90],
			overlay: Gray[80],
			input: Gray[100],
		},
		primary: brand(primaryMain, Common.Black, Blue[40], Blue[60]),
		accent: brand(accentMain, Common.Black, Purple[30], Purple[50]),
		text: {
			primary: Common.White,
			secondary: Gray[50],
			disabled: Gray[70],
			inverse: Common.Black,
			link: Blue[40],
		},
		border: Gray[60],
		divider: Gray[70],
		focus: Blue[50],
		action: {
			hover: lighten(Gray[90], 0.08),
			pressed: Gray[80],
			selected: mix(Blue[110], Gray[90], 0.45),
			disabled: Gray[70],
		},
		status: {
			success: status(Green[50], Common.Black, Green[110], Green[60]),
			warning: status(Yellow[60], Common.Black, Yellow[110], Yellow[70]),
			error: status(Red[50], Common.Black, Red[110], Red[60]),
			info: status(Blue[50], Common.Black, Blue[110], Blue[60]),
		},
		backdrop: Common.Black,
		shadow: Common.Black,
	};
};
