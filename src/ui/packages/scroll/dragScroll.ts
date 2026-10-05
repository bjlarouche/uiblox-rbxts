export const DRAG_SCROLL_THRESHOLD = 6;

export type DragScrollAxis = "x" | "y" | "xy";

export function scrollAxis(direction: Enum.ScrollingDirection): DragScrollAxis {
	if (direction === Enum.ScrollingDirection.X) return "x";
	if (direction === Enum.ScrollingDirection.Y) return "y";
	return "xy";
}

export function shouldBeginDragScroll(
	start: Vector2,
	current: Vector2,
	axis: DragScrollAxis,
	threshold = DRAG_SCROLL_THRESHOLD,
): boolean {
	const dx = math.abs(current.X - start.X);
	const dy = math.abs(current.Y - start.Y);
	if (axis === "x") return dx >= threshold && dx >= dy;
	if (axis === "y") return dy >= threshold && dy >= dx;
	return math.max(dx, dy) >= threshold;
}

export function nextCanvasPosition(
	startCanvas: Vector2,
	startPointer: Vector2,
	currentPointer: Vector2,
	axis: DragScrollAxis,
	maxCanvas: Vector2,
): Vector2 {
	const dx = axis === "y" ? 0 : startPointer.X - currentPointer.X;
	const dy = axis === "x" ? 0 : startPointer.Y - currentPointer.Y;
	return new Vector2(
		math.clamp(startCanvas.X + dx, 0, math.max(0, maxCanvas.X)),
		math.clamp(startCanvas.Y + dy, 0, math.max(0, maxCanvas.Y)),
	);
}

export function canvasScrollMax(frame: ScrollingFrame): Vector2 {
	return new Vector2(
		math.max(0, frame.AbsoluteCanvasSize.X - frame.AbsoluteWindowSize.X),
		math.max(0, frame.AbsoluteCanvasSize.Y - frame.AbsoluteWindowSize.Y),
	);
}

export function pointerInFrame(frame: GuiObject, position: Vector3 | Vector2): boolean {
	const origin = frame.AbsolutePosition;
	const size = frame.AbsoluteSize;
	return (
		position.X >= origin.X &&
		position.X <= origin.X + size.X &&
		position.Y >= origin.Y &&
		position.Y <= origin.Y + size.Y
	);
}

export function isDragScrollPress(input: InputObject): boolean {
	const kind = input.UserInputType;
	return kind === Enum.UserInputType.MouseButton1 || kind === Enum.UserInputType.Touch;
}
