export type SwitchPointer = "rest" | "hover" | "press" | "focus";

export function switchPointer(hovering: boolean, pressed: boolean, focused: boolean): SwitchPointer {
	if (pressed) return "press";
	if (focused) return "focus";
	if (hovering) return "hover";
	return "rest";
}

export function switchTrackTransparency(on: boolean, disabled: boolean, pointer: SwitchPointer) {
	if (disabled) return on ? 0.55 : 0.65;
	if (!on) {
		if (pointer === "press") return 0.15;
		if (pointer === "hover" || pointer === "focus") return 0.25;
		return 0.35;
	}
	if (pointer === "press") return 0.15;
	if (pointer === "hover") return 0.08;
	return 0;
}

export function switchThumbTransparency(disabled: boolean) {
	return disabled ? 0.35 : 0;
}

export function switchStrokeTransparency(disabled: boolean, pointer: SwitchPointer) {
	if (disabled) return 1;
	if (pointer === "focus" || pointer === "press") return 0;
	if (pointer === "hover") return 0.35;
	return 1;
}

export function switchThumbPlacement(on: boolean, inset: number) {
	return {
		scaleX: on ? 1 : 0,
		offsetX: on ? -inset : inset,
		anchorX: on ? 1 : 0,
	};
}
