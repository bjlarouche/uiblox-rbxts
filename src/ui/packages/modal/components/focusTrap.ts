export function pickFocus<T>(
	nodes: ReadonlyArray<T>,
	selected: T | undefined,
	contains: boolean,
	selectable: (node: T) => boolean,
): T | undefined {
	if (contains && selected !== undefined) return selected;
	for (const node of nodes) {
		if (selectable(node)) return node;
	}
	return undefined;
}

export function isFocusable(node: Instance): node is GuiObject {
	if (!node.IsA("GuiButton") && !node.IsA("TextBox")) return false;
	return node.Selectable && node.Visible;
}
