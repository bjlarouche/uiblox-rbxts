export function accordionOpen(expanded: boolean | undefined, controlled: boolean | undefined) {
	if (controlled !== undefined) return controlled;
	return expanded === true;
}
