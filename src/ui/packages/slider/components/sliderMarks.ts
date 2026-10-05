export function sliderMarkValues(
	min: number,
	max: number,
	step: number | undefined,
	marks: boolean | ReadonlyArray<number> | undefined,
): number[] {
	if (marks === undefined || marks === false) return [];
	if (marks !== true) {
		const out: number[] = [];
		for (const value of marks) {
			if (value >= min && value <= max) out.push(value);
		}
		return out;
	}
	const span = max - min;
	if (span <= 0) return [min];
	const increment = step !== undefined && step > 0 ? step : span;
	const out: number[] = [];
	let value = min;
	let guard = 0;
	while (value <= max + increment * 1e-9 && guard < 64) {
		out.push(math.clamp(value, min, max));
		value += increment;
		guard += 1;
	}
	if (out[out.size() - 1] !== max) out.push(max);
	return out;
}
