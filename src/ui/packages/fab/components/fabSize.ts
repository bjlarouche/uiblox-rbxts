export type FabSize = "small" | "medium" | "large";

export function fabPixels(size: FabSize = "medium") {
	if (size === "small") return 40;
	if (size === "large") return 64;
	return 56;
}

export function fabIconPixels(size: FabSize = "medium") {
	if (size === "small") return 18;
	if (size === "large") return 28;
	return 24;
}
