export type VirtualListAlign = "start" | "center" | "end" | "nearest";

export interface VirtualWindow {
	start: number;
	end: number;
}

export function clampScroll(scrollTop: number, viewportHeight: number, contentHeight: number) {
	const max = math.max(0, contentHeight - viewportHeight);
	return math.clamp(scrollTop, 0, max);
}

export function visibleWindow(
	scrollTop: number,
	viewportHeight: number,
	itemCount: number,
	itemHeight: number,
	overscan = 2,
): VirtualWindow {
	if (itemCount <= 0 || itemHeight <= 0 || viewportHeight < 0) {
		return { start: 0, end: -1 };
	}
	const first = math.floor(scrollTop / itemHeight);
	const last = math.floor((scrollTop + viewportHeight) / itemHeight);
	return {
		start: math.max(0, first - overscan),
		end: math.min(itemCount - 1, last + overscan),
	};
}

export function itemOffset(index: number, itemHeight: number) {
	return index * itemHeight;
}

export function ensureVisibleScroll(
	scrollTop: number,
	viewportHeight: number,
	index: number,
	itemCount: number,
	itemHeight: number,
	align: VirtualListAlign = "nearest",
) {
	if (itemCount <= 0 || itemHeight <= 0 || index < 0 || index >= itemCount) {
		return clampScroll(scrollTop, viewportHeight, itemCount * itemHeight);
	}

	const top = itemOffset(index, itemHeight);
	const bottom = top + itemHeight;
	const contentHeight = itemCount * itemHeight;
	const visibleBottom = scrollTop + viewportHeight;

	if (align === "nearest") {
		if (top < scrollTop) return clampScroll(top, viewportHeight, contentHeight);
		if (bottom > visibleBottom) return clampScroll(bottom - viewportHeight, viewportHeight, contentHeight);
		return clampScroll(scrollTop, viewportHeight, contentHeight);
	}

	if (align === "start") return clampScroll(top, viewportHeight, contentHeight);
	if (align === "end") return clampScroll(bottom - viewportHeight, viewportHeight, contentHeight);
	return clampScroll(top + itemHeight / 2 - viewportHeight / 2, viewportHeight, contentHeight);
}

export function scrollToIndexOffset(
	index: number,
	itemCount: number,
	itemHeight: number,
	viewportHeight: number,
	align: VirtualListAlign = "start",
) {
	return ensureVisibleScroll(0, viewportHeight, index, itemCount, itemHeight, align === "nearest" ? "start" : align);
}
