/** Remaining fraction of the child to shade. Zero when there is nothing left. */
export function coverFill(value?: number) {
	if (value === undefined || value <= 0) return 0;
	if (value >= 1) return 1;
	return value;
}
