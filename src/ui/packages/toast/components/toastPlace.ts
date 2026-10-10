export type ToastEdge = "top" | "bottom";

export interface ToastPlace {
	anchorY: number;
	activeY: number;
	activeOffset: number;
	idleY: number;
	idleOffset: number;
}

/** Bottom stays the default. Top sits on the upper edge and hides above the frame. */
export function toastPlace(edge: ToastEdge | undefined, inset: number, hidden: number): ToastPlace {
	if (edge === "top") {
		return { anchorY: 0, activeY: 0, activeOffset: inset, idleY: 0, idleOffset: -hidden };
	}
	return { anchorY: 1, activeY: 1, activeOffset: -inset, idleY: 1, idleOffset: hidden };
}

/** A line wider than the toast wraps. A short line stays one row. */
export function toastWrap(textWidth: number, box: number) {
	if (box <= 0) return false;
	return textWidth > box;
}

export type ToastGlyph = "success" | "error" | "warning" | "info";

export function toastGlyph(variant?: string): ToastGlyph | undefined {
	if (variant === "success" || variant === "error" || variant === "warning" || variant === "info") return variant;
	return undefined;
}

/** Enter slide, then the visible duration. Reduced motion skips the slide. */
export function toastHold(enter: number, visible: number, reduced?: boolean) {
	const slide = reduced === true ? 0 : enter;
	return slide + visible;
}
