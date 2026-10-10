import { FontFamilyVariant } from "./FontFamilyOptions";
import { FontSizeVariant } from "./FontSizeOptions";

export interface TypographyVariantSpec {
	size: number;
	family: FontFamilyVariant;
	/** Approx CSS weight; Roblox TextLabel uses `family` / FontFace */
	weight: number;
	/** TextLabel.LineHeight multiplier */
	leading: number;
}

export type TypographyVariants = FontSizeVariant;

/** Size, family, weight, and line height per typography variant. */
export const allTypographyVariants: Record<FontSizeVariant, TypographyVariantSpec> = {
	display: { size: 36, family: "bold", weight: 700, leading: 1.15 },
	h1: { size: 28, family: "bold", weight: 700, leading: 1.2 },
	h2: { size: 22, family: "bold", weight: 700, leading: 1.2 },
	h3: { size: 18, family: "semibold", weight: 600, leading: 1.3 },
	h4: { size: 16, family: "semibold", weight: 600, leading: 1.3 },
	h5: { size: 14, family: "semibold", weight: 600, leading: 1.3 },
	h6: { size: 14, family: "semibold", weight: 600, leading: 1.3 },
	subtitle1: { size: 16, family: "default", weight: 400, leading: 1.4 },
	subtitle2: { size: 14, family: "semibold", weight: 600, leading: 1.4 },
	body: { size: 14, family: "default", weight: 400, leading: 1.4 },
	bodySmall: { size: 13, family: "default", weight: 400, leading: 1.4 },
	button: { size: 13, family: "semibold", weight: 600, leading: 1.15 },
	caption: { size: 12, family: "default", weight: 400, leading: 1.4 },
	overline: { size: 10, family: "default", weight: 400, leading: 1.4 },
};

/** @deprecated prefer allTypographyVariants[*].weight */
export const TypographyWeights = {
	title: 700,
	heading: 600,
	body: 400,
};
