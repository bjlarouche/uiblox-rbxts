export function writeNumberRange(min: number, max: number, field: "Min" | "Max", amount: number) {
	if (field === "Min") return { Min: amount, Max: max };
	return { Min: min, Max: amount };
}
