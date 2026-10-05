export function includesChoice<T>(values: ReadonlyArray<T> | undefined, value: T) {
	if (values === undefined) return false;
	for (const item of values) {
		if (item === value) return true;
	}
	return false;
}

export function selectionLabel<T>(
	options: { label: string; value: T }[],
	values: ReadonlyArray<T>,
	placeholder: string,
) {
	let text = "";
	for (const option of options) {
		if (!includesChoice(values, option.value)) continue;
		text = text.size() === 0 ? option.label : `${text}, ${option.label}`;
	}
	return text.size() === 0 ? placeholder : text;
}
