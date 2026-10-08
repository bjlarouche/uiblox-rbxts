export interface CardColumnWidth {
	scale: number;
	offset: number;
}

/** Fluid cards fill the parent. The default stays the fixed column. */
export function cardColumnWidth(fullWidth: boolean | undefined, fixed: number): CardColumnWidth {
	if (fullWidth === true) return { scale: 1, offset: 0 };
	return { scale: 0, offset: fixed };
}

/** A title wider than the column wraps. A short title stays one line. */
export function cardTitleWrap(textWidth: number, column: number) {
	if (column <= 0) return false;
	return textWidth > column;
}
