import { FontFamilyVariant } from "./FontFamilyOptions";
import { FontSizeVariant } from "./FontSizeOptions";

export interface TypographyVariantSpec {
	size: number;
	family: FontFamilyVariant;
	/** Approx CSS weight; Roblox TextLabel uses `family` / FontFace */
	weight: number;
}

export type TypographyVariants = FontSizeVariant;

/** Size + family + weight per typography variant. */
export const allTypographyVariants: Record<FontSizeVariant, TypographyVariantSpec> = {
	h1: { size: 28, family: "bold", weight: 700 },
	h2: { size: 22, family: "bold", weight: 700 },
	h3: { size: 18, family: "semibold", weight: 600 },
	h4: { size: 16, family: "semibold", weight: 600 },
	h5: { size: 14, family: "semibold", weight: 600 },
	h6: { size: 14, family: "semibold", weight: 600 },
	subtitle1: { size: 16, family: "default", weight: 400 },
	subtitle2: { size: 14, family: "semibold", weight: 600 },
	body: { size: 14, family: "default", weight: 400 },
	button: { size: 13, family: "semibold", weight: 600 },
	caption: { size: 12, family: "default", weight: 400 },
	overline: { size: 10, family: "default", weight: 400 },
};

/** @deprecated prefer allTypographyVariants[*].weight */
export const TypographyWeights = {
	title: 700,
	heading: 600,
	body: 400,
};
