/** Caption for the current value. Missing or blank format leaves the track full width. */
export function sliderLabel(format: ((value: number) => string) | undefined, value: number) {
	if (format === undefined) return undefined;
	const text = format(value);
	if (text === "") return undefined;
	return text;
}
