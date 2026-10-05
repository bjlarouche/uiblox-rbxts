export function breadcrumbCurrent(index: number, count: number) {
	return count > 0 && index === count - 1;
}

export interface BreadcrumbSlice {
	label: string;
	index: number;
	ellipsis?: boolean;
}

/** Collapse middle items when over maxItems (keep ends). */
export function breadcrumbVisible<T extends { label: string }>(items: T[], maxItems?: number): BreadcrumbSlice[] {
	const count = items.size();
	if (maxItems === undefined || maxItems < 1 || count <= maxItems) {
		const out: BreadcrumbSlice[] = [];
		for (let i = 0; i < count; i++) {
			out.push({ label: items[i].label, index: i });
		}
		return out;
	}
	if (maxItems === 1) {
		return [{ label: items[count - 1].label, index: count - 1 }];
	}
	const keepEnd = 1;
	const rawStart = maxItems - keepEnd - 1;
	const keepStart = rawStart < 1 ? 1 : rawStart;
	const out: BreadcrumbSlice[] = [];
	for (let i = 0; i < keepStart; i++) {
		out.push({ label: items[i].label, index: i });
	}
	out.push({ label: "…", index: -1, ellipsis: true });
	out.push({ label: items[count - 1].label, index: count - 1 });
	return out;
}
