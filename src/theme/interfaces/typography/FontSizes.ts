import { FontSizeOptions } from "./FontSizeOptions";
import { allTypographyVariants } from "./Variants";

export const baseFontSize = allTypographyVariants.body.size;

export const allFontSizes: FontSizeOptions = {
	display: allTypographyVariants.display.size,
	h1: allTypographyVariants.h1.size,
	h2: allTypographyVariants.h2.size,
	h3: allTypographyVariants.h3.size,
	h4: allTypographyVariants.h4.size,
	h5: allTypographyVariants.h5.size,
	h6: allTypographyVariants.h6.size,
	subtitle1: allTypographyVariants.subtitle1.size,
	subtitle2: allTypographyVariants.subtitle2.size,
	body: allTypographyVariants.body.size,
	bodySmall: allTypographyVariants.bodySmall.size,
	caption: allTypographyVariants.caption.size,
	overline: allTypographyVariants.overline.size,
	button: allTypographyVariants.button.size,
};
