export function clampSplit(size: number, total: number, min = 0, max = total) {
	const upper = math.max(min, math.min(max, total - min));
	return math.min(math.max(size, min), upper);
}
