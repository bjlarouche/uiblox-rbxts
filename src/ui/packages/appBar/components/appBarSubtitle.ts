/** An empty second line stays off the bar. */
export function appBarSubtitle(text?: string) {
	if (text === undefined || text === "") return undefined;
	return text;
}
