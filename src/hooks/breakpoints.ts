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

export type Responsive<T> = T | { phone?: T; tablet?: T; desktop?: T };

export function resolveResponsive<T>(value: Responsive<T> | undefined, width: number): T | undefined {
	if (value === undefined || typeOf(value) !== "table") return value as T | undefined;
	const record = value as { phone?: T; tablet?: T; desktop?: T };
	const name = breakpointName(width);
	if (name === "desktop") return record.desktop ?? record.tablet ?? record.phone;
	if (name === "tablet") return record.tablet ?? record.phone;
	return record.phone;
}
