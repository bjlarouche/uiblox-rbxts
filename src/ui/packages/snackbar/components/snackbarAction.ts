export function snackbarActionLabel(action?: string) {
	if (action === undefined || action.size() === 0) return undefined;
	return action;
}
