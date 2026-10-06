/** Shrink-wrap by default. Wrap uses the parent width and grows with the text. */
export function textBox(wrap?: boolean) {
	if (wrap === true) return { widthScale: 1, heightScale: 0, automatic: "Y" as const, wrapped: true };
	return { widthScale: 0, heightScale: 0, automatic: "XY" as const, wrapped: false };
}
