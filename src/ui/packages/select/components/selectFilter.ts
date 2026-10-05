export function filterChoices<T extends { label: string }>(options: T[], query: string): T[] {
	if (query.size() === 0) return options;
	const needle = query.lower();
	const matched = new Array<T>();
	for (const option of options) {
		if (option.label.lower().find(needle, 1, true)[0] !== undefined) matched.push(option);
	}
	return matched;
}

export function usesSelectSearch(count: number, searchable?: boolean) {
	if (searchable === false) return false;
	if (searchable === true) return true;
	return count > 8;
}
