/** Hands the string to the caller. Does nothing when there is no callback. */
export function copyInvoke(text: string, onCopy?: (text: string) => void) {
	if (onCopy === undefined) return undefined;
	onCopy(text);
	return text;
}
