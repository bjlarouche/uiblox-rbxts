export function isFiniteNumber(value: unknown): value is number {
	if (typeOf(value) !== "number") return false;
	const number = value as number;
	return number === number && number < math.huge && number > -math.huge;
}

export function finiteOr(value: unknown, fallback: number): number {
	return isFiniteNumber(value) ? value : fallback;
}

export function positiveDimension(value: unknown, fallback: number): number {
	if (!isFiniteNumber(value) || value <= 0) return fallback;
	return value;
}
