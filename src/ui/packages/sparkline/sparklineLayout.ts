export interface SparkSegment {
	x: number;
	y: number;
	length: number;
	rotation: number;
}

export interface SparkBar {
	x: number;
	y: number;
	width: number;
	height: number;
}

function sparklinePoints(values: number[], width: number, height: number, pad: number) {
	const count = values.size();
	if (count < 2 || width <= pad * 2 || height <= pad * 2) return undefined;

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
	return { points, baseline: pad + innerH };
}

/** Line segments for a number series. Empty and single-point series draw nothing. */
export function sparklineLayout(values: number[], width: number, height: number, pad = 4): SparkSegment[] {
	const laid = sparklinePoints(values, width, height, pad);
	if (laid === undefined) return [];

	const segments = new Array<SparkSegment>();
	const count = laid.points.size();
	for (let index = 0; index < count - 1; index++) {
		const start = laid.points[index];
		const finish = laid.points[index + 1];
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

/** Vertical slices under the line. Missing when the series cannot draw. */
export function sparklineArea(values: number[], width: number, height: number, pad = 4): SparkBar[] {
	const laid = sparklinePoints(values, width, height, pad);
	if (laid === undefined) return [];

	const bars = new Array<SparkBar>();
	const count = laid.points.size();
	for (let index = 0; index < count - 1; index++) {
		const start = laid.points[index];
		const finish = laid.points[index + 1];
		const span = finish.x - start.x;
		const slices = math.max(1, math.floor(span / 4));
		const sliceW = span / slices;
		for (let slice = 0; slice < slices; slice++) {
			const y = start.y + (finish.y - start.y) * (slice / slices);
			const top = math.min(y, laid.baseline);
			bars.push({
				x: start.x + slice * sliceW,
				y: top,
				width: sliceW,
				height: math.max(0, laid.baseline - top),
			});
		}
	}
	return bars;
}

/** Nearest sample from a local x. Undefined when the trace cannot be hit. */
export function sparklineIndex(localX: number, count: number, width: number, pad = 4) {
	if (count < 1 || width <= pad * 2) return undefined;
	const span = width - pad * 2;
	let along = (localX - pad) / span;
	if (along < 0) along = 0;
	if (along > 1) along = 1;
	if (count === 1) return 0;
	const index = math.floor(along * (count - 1) + 0.5);
	if (index < 0) return 0;
	if (index > count - 1) return count - 1;
	return index;
}

/** Calls onPick with the nearest sample. Does nothing when the callback is absent. */
export function sparklinePick(
	localX: number,
	count: number,
	width: number,
	onPick?: (index: number) => void,
	pad = 4,
) {
	if (onPick === undefined) return undefined;
	const index = sparklineIndex(localX, count, width, pad);
	if (index === undefined) return undefined;
	onPick(index);
	return index;
}

/** Point for a sample, used to mark the trace. */
export function sparklinePoint(values: number[], index: number, width: number, height: number, pad = 4) {
	const laid = sparklinePoints(values, width, height, pad);
	if (laid === undefined || index < 0 || index >= laid.points.size()) return undefined;
	return laid.points[index];
}
