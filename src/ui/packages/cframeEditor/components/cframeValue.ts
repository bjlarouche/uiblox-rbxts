export type CFrameField = "X" | "Y" | "Z" | "RX" | "RY" | "RZ";

const FIELDS: CFrameField[] = ["X", "Y", "Z", "RX", "RY", "RZ"];

export function cframeFields() {
	return FIELDS;
}

export function cframeAxis(field: CFrameField) {
	if (field === "RX") return "X";
	if (field === "RY") return "Y";
	if (field === "RZ") return "Z";
	return field;
}

export function nextCFrameParts(
	x: number,
	y: number,
	z: number,
	rx: number,
	ry: number,
	rz: number,
	field: CFrameField,
	amount: number,
) {
	const parts = [x, y, z, rx, ry, rz];
	const index =
		field === "X" ? 0 : field === "Y" ? 1 : field === "Z" ? 2 : field === "RX" ? 3 : field === "RY" ? 4 : 5;
	parts[index] = amount;
	return parts;
}
