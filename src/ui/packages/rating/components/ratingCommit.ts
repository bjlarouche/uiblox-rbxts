/** Clicks commit only when the rating is editable and a handler was passed. */
export function ratingCommit(readOnly: boolean | undefined, onChange: ((value: number) => void) | undefined, landed: number) {
	if (readOnly === true || onChange === undefined) return undefined;
	return landed;
}
