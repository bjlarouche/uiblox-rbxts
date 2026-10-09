export function iconButtonScale(size?: string) {
	switch (size) {
		case "xxs":
			return 1;
		case "xs":
			return 1.5;
		case "sm":
			return 2;
		case "md":
			return 3;
		case "lg":
			return 4;
		case "xl":
			return 5;
		default:
			return 2;
	}
}

/** Glyph box inside the button. A fixed 16px mark overflows the small sizes and looks lost in the large ones. */
export function iconGlyphExtent(button: number) {
	return math.max(4, math.floor(button * 0.62));
}

export type IconButtonFace = "clear" | "hover" | "pressed" | "selected";

export function iconButtonFace(input: {
	disabled: boolean;
	loading: boolean;
	selected: boolean;
	hover: boolean;
	down: boolean;
}): IconButtonFace {
	if (input.disabled || input.loading) return "clear";
	if (input.down) return "pressed";
	if (input.selected) return "selected";
	if (input.hover) return "hover";
	return "clear";
}
