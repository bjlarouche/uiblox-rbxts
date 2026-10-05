export function filterBrickNames(names: string[], query: string) {
	if (query.size() === 0) return names;
	const needle = query.lower();
	const matched = new Array<string>();
	for (const name of names) {
		if (name.lower().find(needle, 1, true)[0] !== undefined) matched.push(name);
	}
	return matched;
}

export function brickNameMatches(name: string, query: string) {
	if (query.size() === 0) return true;
	return name.lower().find(query.lower(), 1, true)[0] !== undefined;
}
