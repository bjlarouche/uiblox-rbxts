import { FontFamilyOptions } from "./FontFamilyOptions";
import { FontSizeOptions } from "./FontSizeOptions";
import { FontSizeVariant } from "./FontSizeOptions";
import { TypographyVariantSpec } from "./Variants";

interface ThemeTypography {
	fontSizes: FontSizeOptions;
	fontFamilies: FontFamilyOptions;
	variants: Record<FontSizeVariant, TypographyVariantSpec>;
}

export default ThemeTypography;
