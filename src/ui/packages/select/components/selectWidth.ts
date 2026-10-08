/** Grow past a narrow field so the option fits. Stay at least as wide as the field. */
export function selectWidth(text: number, pad: number, floor: number) {
	let need = text + pad;
	if (need < 0) need = 0;
	if (floor > need) return floor;
	return need;
}
