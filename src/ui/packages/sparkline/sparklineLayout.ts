export interface SparkSegment {
	x: number;
	y: number;
	length: number;
	rotation: number;
}

/** Line segments for a number series. Empty and single-point series draw nothing. */
export function sparklineLayout(values: number[], width: number, height: number, pad = 4): SparkSegment[] {
	const count = values.size();
	if (count < 2 || width <= pad * 2 || height <= pad * 2) return [];

	let min = values[0];
	let max = values[0];
	for (const value of values) {
		if (value < min) min = value;
		if (value > max) max = value;
	}

	const span = math.max(max - min, 1);
	const innerW = width - pad * 2;
	const innerH = height - pad * 2;
	const step = innerW / (count - 1);
	const points = new Array<{ x: number; y: number }>();
	for (let index = 0; index < count; index++) {
		points.push({
			x: pad + index * step,
			y: pad + (1 - (values[index] - min) / span) * innerH,
		});
	}

	const segments = new Array<SparkSegment>();
	for (let index = 0; index < count - 1; index++) {
		const start = points[index];
		const finish = points[index + 1];
		const dx = finish.x - start.x;
		const dy = finish.y - start.y;
		segments.push({
			x: (start.x + finish.x) / 2,
			y: (start.y + finish.y) / 2,
			length: math.sqrt(dx * dx + dy * dy),
			rotation: math.deg(math.atan2(dy, dx)),
		});
	}
	return segments;
}
