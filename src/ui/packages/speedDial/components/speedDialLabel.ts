/** An empty name stays off the action. */
export function speedDialLabel(text?: string) {
	if (text === undefined || text === "") return undefined;
	return text;
}

/** The name sits beside the button, opposite the way the dial travels. */
export function speedDialLabelFirst(direction: "up" | "down" | "left" | "right") {
	return direction !== "left";
}
