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

/** One step up or down. Undefined when the value would not change. */
export function stepNumber(value: number, direction: number, min?: number, max?: number, step?: number) {
	const size = step !== undefined && step > 0 ? step : 1;
	const landed = commitNumber(value + direction * size, min, max, step);
	if (landed === undefined || landed === value) return undefined;
	return landed;
}

export function formatNumber(value: number, places = 4): string {
	if (value !== value || value === math.huge || value === -math.huge) return tostring(value);
	const scale = 10 ** places;
	const scaled = math.floor(math.abs(value) * scale + 0.5);
	if (scaled === 0) return "0";
	const sign = value < 0 ? "-" : "";
	const whole = math.floor(scaled / scale);
	const frac = scaled % scale;
	if (frac === 0) return `${sign}${whole}`;
	let digits = "";
	let rest = frac;
	while (rest > 0) {
		digits = `${rest % 10}${digits}`;
		rest = math.floor(rest / 10);
	}
	while (digits.size() < places) digits = `0${digits}`;
	while (digits.size() > 0 && digits.sub(digits.size(), digits.size()) === "0") digits = digits.sub(1, digits.size() - 1);
	return `${sign}${whole}.${digits}`;
}
