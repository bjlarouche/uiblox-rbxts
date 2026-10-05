export type SplitDims = {
	xScale: number;
	xOffset: number;
	yScale: number;
	yOffset: number;
};

export function clampSplit(size: number, total: number, min = 0, max = total) {
	const upper = math.max(min, math.min(max, total - min));
	return math.min(math.max(size, min), upper);
}

export function splitRuleDims(vertical: boolean, thick: number): SplitDims {
	return vertical
		? { xScale: 1, xOffset: 0, yScale: 0, yOffset: thick }
		: { xScale: 0, xOffset: thick, yScale: 1, yOffset: 0 };
}

export function splitBoxDims(vertical: boolean, along: number, cross: number): SplitDims {
	return vertical
		? { xScale: 0, xOffset: along, yScale: 0, yOffset: cross }
		: { xScale: 0, xOffset: cross, yScale: 0, yOffset: along };
}

export function toUDim2(dims: SplitDims) {
	return new UDim2(dims.xScale, dims.xOffset, dims.yScale, dims.yOffset);
}
