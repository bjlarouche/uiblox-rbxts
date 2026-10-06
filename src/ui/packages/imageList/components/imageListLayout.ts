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

export function imageListAspect(aspect?: number) {
	if (aspect === undefined || aspect <= 0) return 1;
	return aspect;
}

export function imageListCell(itemSize?: number, aspect?: number) {
	const width = imageListItemSize(itemSize);
	const height = math.max(1, math.floor(width / imageListAspect(aspect)));
	return { width, height };
}

export function imageListSelected(selected: ReadonlyArray<number> | undefined, index: number) {
	if (selected === undefined) return false;
	for (const value of selected) {
		if (value === index) return true;
	}
	return false;
}

export function imageListTitle(title?: string) {
	if (title === undefined || title.size() === 0) return undefined;
	return title;
}
