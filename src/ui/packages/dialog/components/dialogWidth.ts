/** Desktop forms stay a column. Phone uses the room instead of the fixed width. */
export const DIALOG_FILL_MAX = 480;

export function dialogWidth(fill: boolean | undefined, available: number, fixed: number, max = DIALOG_FILL_MAX) {
	if (fill !== true || available <= 0) return fixed;
	return available < max ? available : max;
}

/** Two small actions are wider than the fixed column, so the row wraps at every width. */
export function dialogActionWrap(fixed: number, button: number, count: number, gap = 0) {
	if (count < 2 || fixed <= 0) return false;
	return button * count + gap * (count - 1) > fixed;
}

/** A title wider than the column wraps. A short title stays one line. */
export function dialogTitleWrap(textWidth: number, column: number) {
	if (column <= 0) return false;
	return textWidth > column;
}
