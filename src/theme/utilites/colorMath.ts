const channel = (value: number) => {
	const c = value <= 0.03928 ? value / 12.92 : math.pow((value + 0.055) / 1.055, 2.4);
	return c;
};

/** WCAG relative luminance for a Color3 (sRGB, 0–1 channels). */
export const relativeLuminance = (color: Color3): number => {
	return 0.2126 * channel(color.R) + 0.7152 * channel(color.G) + 0.0722 * channel(color.B);
};

/** WCAG contrast ratio between two colors (≥1). */
export const contrastRatio = (a: Color3, b: Color3): number => {
	const l1 = relativeLuminance(a);
	const l2 = relativeLuminance(b);
	const lighter = math.max(l1, l2);
	const darker = math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
};

/** Deterministic channel mix. `t` is 0→a … 1→b. */
export const mix = (a: Color3, b: Color3, t: number): Color3 => {
	const u = math.max(0, math.min(1, t));
	return new Color3(a.R + (b.R - a.R) * u, a.G + (b.G - a.G) * u, a.B + (b.B - a.B) * u);
};

export const lighten = (color: Color3, amount: number): Color3 => mix(color, new Color3(1, 1, 1), amount);

export const darken = (color: Color3, amount: number): Color3 => mix(color, new Color3(0, 0, 0), amount);
