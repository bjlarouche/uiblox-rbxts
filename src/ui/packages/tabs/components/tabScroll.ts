/** Canvas offset that keeps the selected tab inside the view. */
export function tabScroll(current: number, tabStart: number, tabSize: number, view: number) {
	if (view <= 0) return current;
	if (tabStart < current) return tabStart < 0 ? 0 : tabStart;
	const tabEnd = tabStart + tabSize;
	if (tabEnd > current + view) return tabEnd - view;
	return current;
}
