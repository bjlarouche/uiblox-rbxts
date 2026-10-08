/** A missing or empty count stays off the item. Larger counts cap the same way as badgeText. */
export function navBadge(count?: number, max = 99) {
	if (count === undefined || count <= 0) return undefined;
	return count > max ? `${max}+` : `${count}`;
}
