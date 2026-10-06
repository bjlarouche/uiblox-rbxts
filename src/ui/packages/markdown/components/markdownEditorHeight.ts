export function clampEditorHeight(value: number, min = 200, max = 720): number {
	return math.clamp(value, math.min(min, max), math.max(min, max));
}
