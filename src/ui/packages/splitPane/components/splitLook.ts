export type SplitPointer = "rest" | "hover" | "press";

export function splitPointer(hovering: boolean, pressed: boolean): SplitPointer {
	if (pressed) return "press";
	if (hovering) return "hover";
	return "rest";
}

export function splitMarkTransparency(pointer: SplitPointer, disabled?: boolean) {
	if (disabled === true) return 0.75;
	if (pointer === "press") return 0;
	if (pointer === "hover") return 0.2;
	return 0.45;
}

export function splitHitTransparency(pointer: SplitPointer, disabled?: boolean) {
	if (disabled === true || pointer === "rest") return 1;
	if (pointer === "press") return 0.9;
	return 0.94;
}
