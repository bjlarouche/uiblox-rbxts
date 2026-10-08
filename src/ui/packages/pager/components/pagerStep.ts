export function pagerPlace(index: number, count: number) {
	if (count <= 0 || index <= 0) return 0;
	if (index >= count) return count - 1;
	return index;
}

export function pagerStep(index: number, count: number, delta: number) {
	return pagerPlace(pagerPlace(index, count) + delta, count);
}

export function pagerLabel(index: number, count: number) {
	const place = pagerPlace(index, count);
	const shown = count <= 0 ? 0 : place + 1;
	const total = count < 0 ? 0 : count;
	return `${shown} / ${total}`;
}
