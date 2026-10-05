export function nudgeDelta(key: string): number | undefined {
	if (key === "Left" || key === "DPadLeft" || key === "ButtonL") return -1;
	if (key === "Right" || key === "DPadRight" || key === "ButtonR") return 1;
	return undefined;
}

export function nudgeValue(value: number, min: number, max: number, step: number | undefined, direction: number) {
	const delta = step !== undefined && step > 0 ? step : (max - min) / 10;
	let result = value + direction * delta;
	if (step !== undefined && step > 0) {
		result = min + math.floor((result - min) / step + 0.5) * step;
	}
	if (result < min) result = min;
	if (result > max) result = max;
	if (result !== result || result === math.huge || result === -math.huge) return undefined;
	return result;
}

export function isSliderDrag(kind: string) {
	return kind === "MouseButton1" || kind === "Touch";
}

export function isSliderMove(kind: string) {
	return kind === "MouseMovement" || kind === "Touch";
}
