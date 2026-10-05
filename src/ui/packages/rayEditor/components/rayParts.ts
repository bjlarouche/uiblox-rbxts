export function patchRayParts(
	ox: number,
	oy: number,
	oz: number,
	dx: number,
	dy: number,
	dz: number,
	part: "OX" | "OY" | "OZ" | "DX" | "DY" | "DZ",
	amount: number,
) {
	const parts = [ox, oy, oz, dx, dy, dz];
	const index = part === "OX" ? 0 : part === "OY" ? 1 : part === "OZ" ? 2 : part === "DX" ? 3 : part === "DY" ? 4 : 5;
	parts[index] = amount;
	return parts;
}
