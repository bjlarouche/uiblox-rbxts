/** An empty note stays off the option. */
export function radioHint(hint?: string) {
	if (hint === undefined || hint === "") return undefined;
	return hint;
}
