export type RectField = "MinX" | "MinY" | "MaxX" | "MaxY";

export function writeRectParts(minX: number, minY: number, maxX: number, maxY: number, field: RectField, amount: number) {
	const parts = [minX, minY, maxX, maxY];
	const index = field === "MinX" ? 0 : field === "MinY" ? 1 : field === "MaxX" ? 2 : 3;
	parts[index] = amount;
	return parts;
}

export function rectFields(): RectField[] {
	return ["MinX", "MinY", "MaxX", "MaxY"];
}
