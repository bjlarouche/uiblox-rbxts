export const REORDER_THRESHOLD = 6;

export interface DragRect {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
}

export function isReorderPress(kind: Enum.UserInputType) {
	return kind === Enum.UserInputType.MouseButton1 || kind === Enum.UserInputType.Touch;
}

export function isReorderMove(kind: Enum.UserInputType) {
	return kind === Enum.UserInputType.MouseMovement || kind === Enum.UserInputType.Touch;
}

export function isReorderRelease(kind: Enum.UserInputType) {
	return kind === Enum.UserInputType.MouseButton1 || kind === Enum.UserInputType.Touch;
}

export function passedDragThreshold(startX: number, startY: number, x: number, y: number, threshold = REORDER_THRESHOLD) {
	const dx = x - startX;
	const dy = y - startY;
	return dx * dx + dy * dy >= threshold * threshold;
}

/** Smallest rect containing the point wins, so a card beats the column behind it. */
export function hitRect(rects: readonly DragRect[], x: number, y: number) {
	let best: DragRect | undefined;
	let bestArea = math.huge;
	for (const rect of rects) {
		if (x < rect.x || y < rect.y || x > rect.x + rect.width || y > rect.y + rect.height) continue;
		const area = rect.width * rect.height;
		if (area < bestArea) {
			best = rect;
			bestArea = area;
		}
	}
	return best?.id;
}

/** Final index after the move. Out-of-range or a no-op returns a copy. */
export function placeItem<T extends defined>(items: readonly T[], from: number, to: number): T[] {
	const listed: T[] = [];
	for (const item of items) listed.push(item);
	const count = listed.size();
	if (from < 0 || to < 0 || from >= count || to >= count || from === to) return listed;
	const moved = listed[from];
	if (from < to) {
		for (let index = from; index < to; index++) listed[index] = listed[index + 1];
	} else {
		for (let index = from; index > to; index--) listed[index] = listed[index - 1];
	}
	listed[to] = moved;
	return listed;
}

function indexOfId(ids: readonly string[], id: string) {
	for (let index = 0; index < ids.size(); index++) if (ids[index] === id) return index;
	return -1;
}

/**
 * Insert `id` at `index` in `dest` and remove it from `source`.
 * The same list uses placeItem, where index is the final index.
 */
export function transferId(source: readonly string[], dest: readonly string[], id: string, index: number) {
	if (source === dest) {
		const placed = placeItem(source, indexOfId(source, id), math.clamp(index, 0, math.max(0, source.size() - 1)));
		return { source: placed, dest: placed };
	}
	const nextSource: string[] = [];
	let found = false;
	for (const item of source) {
		if (item === id) found = true;
		else nextSource.push(item);
	}
	const nextDest: string[] = [];
	for (const item of dest) nextDest.push(item);
	if (!found) return { source: nextSource, dest: nextDest };
	const at = math.clamp(math.floor(index), 0, nextDest.size());
	const inserted: string[] = [];
	for (let cursor = 0; cursor < at; cursor++) inserted.push(nextDest[cursor]);
	inserted.push(id);
	for (let cursor = at; cursor < nextDest.size(); cursor++) inserted.push(nextDest[cursor]);
	return { source: nextSource, dest: inserted };
}
