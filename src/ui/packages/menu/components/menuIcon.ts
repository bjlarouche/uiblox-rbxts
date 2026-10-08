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
