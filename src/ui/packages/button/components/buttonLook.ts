export type LoadingPosition = "start" | "center" | "end";

export function buttonFace(text: string, loading: boolean, loadingLabel?: string) {
	return {
		text: loading && loadingLabel !== undefined ? loadingLabel : text,
		hideText: loading && loadingLabel === undefined,
	};
}

export function spinnerPlace(position: LoadingPosition = "center") {
	if (position === "start") return { xScale: 0, xOffset: 8, anchorX: 0 };
	if (position === "end") return { xScale: 1, xOffset: -8, anchorX: 1 };
	return { xScale: 0.5, xOffset: 0, anchorX: 0.5 };
}

/** An empty glyph stays off the button. Loading keeps the spinner path. */
export function buttonIcon(icon?: string, loading?: boolean) {
	if (loading === true) return undefined;
	if (icon === undefined || icon === "") return undefined;
	return icon;
}

export function spinnerPixels(size?: "small" | "medium" | "large") {
	if (size === "large") return 16;
	if (size === "medium") return 14;
	return 12;
}

export function iconSpinnerPixels(size?: string) {
	if (size === "xxs" || size === "xs") return 8;
	if (size === "lg" || size === "xl") return 16;
	return 12;
}
