/** Shrink-wrap. Typography keeps the fill size for existing callers. */
export function textBox() {
	return { widthScale: 0, heightScale: 0, automatic: "XY" as const };
}
