export type AxisKey = "X" | "Y" | "Z";

export function readAxis(value: { X: number; Y: number; Z?: number }, axis: AxisKey) {
	if (axis === "X") return value.X;
	if (axis === "Y") return value.Y;
	return value.Z ?? 0;
}

export function writeVector2(value: Vector2, axis: "X" | "Y", amount: number) {
	if (axis === "X") return new Vector2(amount, value.Y);
	return new Vector2(value.X, amount);
}

export function writeVector3(value: Vector3, axis: AxisKey, amount: number) {
	if (axis === "X") return new Vector3(amount, value.Y, value.Z);
	if (axis === "Y") return new Vector3(value.X, amount, value.Z);
	return new Vector3(value.X, value.Y, amount);
}

export function writeUDim(value: UDim, field: "Scale" | "Offset", amount: number) {
	if (field === "Scale") return new UDim(amount, value.Offset);
	return new UDim(value.Scale, amount);
}

export function writeUDim2(value: UDim2, axis: "X" | "Y", field: "Scale" | "Offset", amount: number) {
	const xScale = axis === "X" && field === "Scale" ? amount : value.X.Scale;
	const xOffset = axis === "X" && field === "Offset" ? amount : value.X.Offset;
	const yScale = axis === "Y" && field === "Scale" ? amount : value.Y.Scale;
	const yOffset = axis === "Y" && field === "Offset" ? amount : value.Y.Offset;
	return new UDim2(xScale, xOffset, yScale, yOffset);
}
