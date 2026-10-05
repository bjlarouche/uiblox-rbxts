function lower(value: string) {
	return value.lower();
}

function startsWith(label: string, query: string) {
	return lower(label).sub(1, query.size()) === query;
}

function findChoice(options: { label: string; disabled?: boolean }[], from: number, query: string) {
	const count = options.size();
	if (count === 0 || query.size() === 0) return undefined;
	for (let step = 0; step < count; step++) {
		const index = (from + step) % count;
		const option = options[index];
		if (option === undefined || option.disabled === true) continue;
		if (startsWith(option.label, query)) return index;
	}
	return undefined;
}

export function typeaheadChoice(
	options: { label: string; disabled?: boolean }[],
	highlight: number,
	query: string,
) {
	const needle = lower(query);
	const match = findChoice(options, highlight + 1, needle);
	if (match !== undefined) return match;
	if (needle.size() > 1) {
		const last = needle.sub(needle.size(), needle.size());
		const again = findChoice(options, highlight + 1, last);
		if (again !== undefined) return again;
	}
	return highlight;
}
