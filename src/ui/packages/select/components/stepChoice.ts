export function stepChoice(options: { disabled?: boolean }[], from: number, delta: 1 | -1) {
	for (let index = from + delta; options[index] !== undefined; index += delta) {
		if (!options[index].disabled) return index;
	}
	return from;
}
