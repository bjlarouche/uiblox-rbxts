export type PageToken = number | "ellipsis";

export function pageRange(count: number, page = 1, siblingCount = 1, boundaryCount = 1): PageToken[] {
	const total = math.max(0, math.floor(count));
	if (total === 0) return [];
	const current = math.clamp(math.floor(page), 1, total);
	const siblings = math.max(0, math.floor(siblingCount));
	const boundaries = math.max(0, math.floor(boundaryCount));

	const rangeLength = boundaries * 2 + siblings * 2 + 3;
	if (total <= rangeLength) {
		const all = new Array<PageToken>();
		for (let i = 1; i <= total; i++) all.push(i);
		return all;
	}

	const startFrom = math.max(current - siblings, boundaries + 2);
	const endAt = math.min(current + siblings, total - (boundaries + 1));

	const tokens = new Array<PageToken>();
	for (let i = 1; i <= boundaries; i++) tokens.push(i);

	if (startFrom > boundaries + 2) {
		tokens.push("ellipsis");
	} else if (boundaries + 1 < startFrom) {
		tokens.push(boundaries + 1);
	}

	for (let i = startFrom; i <= endAt; i++) tokens.push(i);

	if (endAt < total - (boundaries + 1)) {
		tokens.push("ellipsis");
	} else if (endAt + 1 < total - boundaries + 1) {
		tokens.push(endAt + 1);
	}

	for (let i = total - boundaries + 1; i <= total; i++) tokens.push(i);
	return tokens;
}
