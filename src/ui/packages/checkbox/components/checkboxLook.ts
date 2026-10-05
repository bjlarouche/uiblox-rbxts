export type CheckboxPointer = "rest" | "hover" | "press" | "focus";

export function checkboxMark(value: boolean, mixed?: boolean) {
	if (mixed === true) return "–";
	return value ? "✓" : "";
}

export function checkboxPointer(hovering: boolean, pressed: boolean, focused: boolean): CheckboxPointer {
	if (pressed) return "press";
	if (focused) return "focus";
	if (hovering) return "hover";
	return "rest";
}

export function checkboxBoxTransparency(filled: boolean, disabled: boolean, pointer: CheckboxPointer) {
	if (filled) return disabled ? 0.55 : 0;
	if (disabled) return 1;
	if (pointer === "press") return 0.7;
	if (pointer === "hover" || pointer === "focus") return 0.85;
	return 1;
}

export function checkboxStrokeTransparency(filled: boolean, disabled: boolean, pointer: CheckboxPointer) {
	if (disabled) return 0.55;
	if (pointer === "focus" || pointer === "press") return 0;
	if (pointer === "hover") return 0.2;
	return filled ? 0.25 : 0.45;
}
