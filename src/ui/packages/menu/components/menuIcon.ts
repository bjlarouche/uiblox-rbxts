/** An empty glyph stays off the row. */
export function menuIcon(icon?: string) {
	if (icon === undefined || icon === "") return undefined;
	return icon;
}

/** Icon rows need the leading slot. Plain rows stay the short menu height. */
export function menuRow(dense?: boolean, icon?: boolean) {
	if (icon === true) return dense === true ? 44 : 48;
	return dense === true ? 22 : 28;
}

/** Grow past a narrow anchor so the label and glyph fit. Stay at least as wide as the anchor. */
export function menuWidth(text: number, icon: boolean, pad: number, floor: number) {
	const lead = icon ? 48 : 0;
	let need = text + lead + pad;
	if (need < 0) need = 0;
	if (floor > need) return floor;
	return need;
}
