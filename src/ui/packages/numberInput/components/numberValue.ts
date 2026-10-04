export function commitNumber(value: number | undefined, min?: number, max?: number, step?: number) {
	if (value === undefined || value !== value || value === math.huge || value === -math.huge) return undefined;
	let result = value;
	if (step !== undefined && step > 0) {
		const base = min ?? 0;
		result = base + math.floor((result - base) / step + 0.5) * step;
	}
	if (min !== undefined && result < min) result = min;
	if (max !== undefined && result > max) result = max;
	return result;
}

export function parseNumberDraft(text: string, min?: number, max?: number, step?: number) {
	return commitNumber(tonumber(text), min, max, step);
}
