/** Keep a field within max characters. A missing or negative max leaves the text alone. */
export function clampText(text: string, max?: number) {
	if (max === undefined || max < 0) return text;
	if (text.size() <= max) return text;
	return text.sub(1, max);
}
