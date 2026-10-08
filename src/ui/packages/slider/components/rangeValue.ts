export type RangeThumb = "low" | "high";

export interface RangeValue {
	start: number;
	finish: number;
}

export function orderRange(start: number, finish: number): RangeValue {
	if (start <= finish) return { start, finish };
	return { start: finish, finish: start };
}

function unit(value: number, min: number, span: number) {
	let ratio = (value - min) / span;
	if (ratio < 0) ratio = 0;
	if (ratio > 1) ratio = 1;
	return ratio;
}

export function rangeRatios(start: number, finish: number, min: number, max: number) {
	const span = max - min;
	const ordered = orderRange(start, finish);
	if (!(span > 0)) return { low: 0, high: 0 };
	return { low: unit(ordered.start, min, span), high: unit(ordered.finish, min, span) };
}

/** Ties belong to the high thumb. */
export function rangeThumb(pointer: number, start: number, finish: number): RangeThumb {
	const ordered = orderRange(start, finish);
	return pointer < (ordered.start + ordered.finish) / 2 ? "low" : "high";
}

export function rangeMove(thumb: RangeThumb, value: number, start: number, finish: number) {
	const ordered = orderRange(start, finish);
	if (thumb === "low") {
		if (value > ordered.finish) return { thumb: "high" as const, start: ordered.finish, finish: value };
		return { thumb: "low" as const, start: value, finish: ordered.finish };
	}
	if (value < ordered.start) return { thumb: "low" as const, start: value, finish: ordered.start };
	return { thumb: "high" as const, start: ordered.start, finish: value };
}
