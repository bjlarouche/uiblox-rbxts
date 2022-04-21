import { FontSizeOptions } from "./FontSizeOptions";

export const baseFontSize = 16;

export const allFontSizes: FontSizeOptions = {
	h1: baseFontSize * 2, // 32
	h2: baseFontSize * 1.5, // 24
	h3: baseFontSize * 1.25, // 20
	body: baseFontSize,
	caption: baseFontSize * 0.75, // 12
	overline: baseFontSize * 0.625, // 10
	button: baseFontSize * 0.875, // 14
};
