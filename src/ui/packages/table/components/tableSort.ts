function sortKey(value: unknown): string | number {
	if (typeIs(value, "number")) return value;
	if (typeIs(value, "string") && value !== "") {
		const numeric = tonumber(value);
		if (numeric !== undefined) return numeric;
		return value;
	}
	return "";
}

function keyBefore(left: string | number, right: string | number) {
	if (typeIs(left, "number") && typeIs(right, "number")) return left < right;
	const leftText = typeIs(left, "number") ? `${left}` : left;
	const rightText = typeIs(right, "number") ? `${right}` : right;
	return leftText < rightText;
}

function rowBefore(rows: ReadonlyArray<ReadonlyArray<unknown>>, left: number, right: number, column: number, desc: boolean) {
	const leftKey = sortKey(rows[left][column]);
	const rightKey = sortKey(rows[right][column]);
	if (leftKey === rightKey) return false;
	const before = keyBefore(leftKey, rightKey);
	return desc ? !before : before;
}

/** Source indexes in sort order. Ties keep the original row order. */
export function sortedRowOrder(rows: ReadonlyArray<ReadonlyArray<unknown>>, column?: number, direction?: "asc" | "desc") {
	const count = rows.size();
	const order = new Array<number>();
	for (let index = 0; index < count; index++) order.push(index);
	if (column === undefined) return order;
	const desc = direction === "desc";
	for (let index = 1; index < count; index++) {
		const current = order[index];
		let slot = index;
		while (slot > 0 && rowBefore(rows, current, order[slot - 1], column, desc)) {
			order[slot] = order[slot - 1];
			slot -= 1;
		}
		order[slot] = current;
	}
	return order;
}
