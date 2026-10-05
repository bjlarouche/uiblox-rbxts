export function pageRange(count: number) {
	const pages = new Array<number>();
	for (let page = 1; page <= math.max(0, math.floor(count)); page++) pages.push(page);
	return pages;
}
