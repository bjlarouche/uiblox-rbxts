export type BoxPad = number | { x?: number; y?: number; top?: number; right?: number; bottom?: number; left?: number };

export function boxPadSides(padding?: BoxPad): { top: number; right: number; bottom: number; left: number } {
	if (padding === undefined) return { top: 0, right: 0, bottom: 0, left: 0 };
	if (typeIs(padding, "number")) {
		return { top: padding, right: padding, bottom: padding, left: padding };
	}
	const x = padding.x ?? 0;
	const y = padding.y ?? 0;
	return {
		top: padding.top ?? y,
		right: padding.right ?? x,
		bottom: padding.bottom ?? y,
		left: padding.left ?? x,
	};
}
