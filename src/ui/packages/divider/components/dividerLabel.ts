export function dividerLabel(text?: string) {
	if (text === undefined || text.size() === 0) return undefined;
	return text;
}

/** A caption wider than the row caps. A short caption stays on the line. */
export function dividerFit(textWidth: number, box: number) {
	if (box <= 0) return 0;
	if (textWidth <= box) return 0;
	return box;
}
