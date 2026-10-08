export type TimelineTone = "done" | "active" | "pending" | "error";

export function timelineTone(tone?: string): TimelineTone {
	if (tone === "done" || tone === "active" || tone === "error" || tone === "pending") return tone;
	return "pending";
}

/** Connector under an item. The last item, and a list shorter than two, has none. */
export function timelineRail(index: number, count: number) {
	return index >= 0 && count > 1 && index < count - 1;
}
