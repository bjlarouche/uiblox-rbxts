export function canFocusGui(object?: {
	Parent?: unknown;
	FindFirstAncestorWhichIsA?(className: string): unknown;
}) {
	return (
		object !== undefined &&
		object.Parent !== undefined &&
		object.FindFirstAncestorWhichIsA?.("PlayerGui") !== undefined
	);
}
