/** Caption for the current value. Missing or blank format leaves the track full width. */
export function sliderLabel(format: ((value: number) => string) | undefined, value: number) {
	if (format === undefined) return undefined;
	const text = format(value);
	if (text === "") return undefined;
	return text;
}

/** A long caption grows past the short slot. A short caption keeps that slot. */
export function sliderSlot(textWidth: number, floor: number, pad = 0) {
	let need = textWidth + pad;
	if (need < 0) need = 0;
	if (floor > need) return floor;
	return need;
}
