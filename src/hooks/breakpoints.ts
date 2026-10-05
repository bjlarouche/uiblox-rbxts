export type BreakpointName = "phone" | "tablet" | "desktop";
export type OrientationName = "portrait" | "landscape";

function usable(value: number) {
	if (typeOf(value) !== "number" || value !== value || value >= math.huge || value <= -math.huge || value <= 0) return 0;
	return value;
}

export function breakpointName(width: number): BreakpointName {
	const size = usable(width);
	if (size < 600) return "phone";
	if (size < 960) return "tablet";
	return "desktop";
}

export function orientationName(width: number, height: number): OrientationName {
	return usable(height) > usable(width) ? "portrait" : "landscape";
}
