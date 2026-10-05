export type FlexItemAlign = "auto" | "start" | "center" | "end" | "stretch";
export type FlexItemModeName = "none" | "grow" | "shrink" | "fill" | "custom";

export function flexItemMode(grow?: number, shrink?: number, fill?: boolean): FlexItemModeName {
	if (fill) return "fill";
	const g = grow !== undefined && grow > 0;
	const s = shrink !== undefined && shrink > 0;
	if (g && s) return "custom";
	if (g) return "grow";
	if (s) return "shrink";
	return "none";
}

export function flexItemGrowRatio(grow?: number) {
	return grow === undefined ? 0 : grow;
}

export function flexItemShrinkRatio(shrink?: number) {
	return shrink === undefined ? 0 : shrink;
}

export function flexItemAlignKey(align?: FlexItemAlign): FlexItemAlign {
	if (align === "start" || align === "center" || align === "end" || align === "stretch") return align;
	return "auto";
}
