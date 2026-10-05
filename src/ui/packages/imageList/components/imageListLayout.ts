export function imageListCols(cols?: number) {
	if (cols === undefined || cols < 1) return 3;
	return math.floor(cols);
}

export function imageListGap(gap?: number) {
	if (gap === undefined || gap < 0) return 1;
	return gap;
}

export function imageListItemSize(itemSize?: number) {
	if (itemSize === undefined || itemSize < 1) return 96;
	return math.floor(itemSize);
}
