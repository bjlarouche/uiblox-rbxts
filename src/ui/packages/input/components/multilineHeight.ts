export function multilineHeight(
	measured: number,
	lineHeight: number,
	minRows: number,
	maxRows: number,
	padding: number,
) {
	const minimumRows = math.max(1, math.floor(minRows));
	const maximumRows = math.max(minimumRows, math.floor(maxRows));
	const minimum = minimumRows * lineHeight + padding * 2;
	const maximum = maximumRows * lineHeight + padding * 2;
	return math.clamp(measured + padding * 2, minimum, maximum);
}
