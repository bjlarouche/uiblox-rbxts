/** Desktop forms stay a column. Phone uses the room instead of the fixed width. */
export const DIALOG_FILL_MAX = 480;

export function dialogWidth(fill: boolean | undefined, available: number, fixed: number, max = DIALOG_FILL_MAX) {
	if (fill !== true || available <= 0) return fixed;
	return available < max ? available : max;
}
