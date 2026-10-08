/** An empty label stays off the banner. */
export function alertAction(label?: string) {
	if (label === undefined || label === "") return undefined;
	return label;
}
