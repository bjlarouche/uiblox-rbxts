export type SplitPointer = "rest" | "hover" | "press";

export function splitPointer(hovering: boolean, pressed: boolean): SplitPointer {
	if (pressed) return "press";
	if (hovering) return "hover";
	return "rest";
}

export function splitRuleTransparency(pointer: SplitPointer, disabled?: boolean) {
	if (disabled === true) return 0.7;
	if (pointer === "press") return 0.25;
	if (pointer === "hover") return 0.35;
	return 0.55;
}

export function splitMarkTransparency(pointer: SplitPointer, disabled?: boolean) {
	if (disabled === true) return 0.55;
	if (pointer === "press") return 0;
	if (pointer === "hover") return 0;
	return 0.1;
}

export function splitHitTransparency(pointer: SplitPointer, disabled?: boolean) {
	if (disabled === true || pointer === "rest") return 1;
	if (pointer === "press") return 0.9;
	return 0.94;
}
