export type StackDirection = "row" | "column";
export type StackAlign = "start" | "center" | "end" | "stretch";
export type StackJustify = "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";

export function stackIsRow(direction?: StackDirection) {
	return direction === "row";
}

export function stackGap(spacing?: number, gap?: number) {
	if (gap !== undefined) return gap;
	return spacing === undefined ? 1 : spacing;
}

export function stackUsesFlex(justify?: StackJustify) {
	return justify === "space-between" || justify === "space-around" || justify === "space-evenly";
}

export function stackNeedsMainFill(wrap?: boolean, justify?: StackJustify) {
	return wrap === true || stackUsesFlex(justify);
}

export function stackRootAutomaticSize(row: boolean, fillMain: boolean): "XY" | "X" | "Y" {
	if (!fillMain) return "XY";
	return row ? "Y" : "X";
}

export function stackAlignKey(align?: StackAlign): StackAlign {
	if (align === "center" || align === "end" || align === "stretch") return align;
	return "start";
}

export function stackJustifyKey(justify?: StackJustify): StackJustify {
	if (
		justify === "center" ||
		justify === "end" ||
		justify === "space-between" ||
		justify === "space-around" ||
		justify === "space-evenly"
	) {
		return justify;
	}
	return "start";
}
