export function syncInputDraft(focused: boolean, text: string | undefined, draft: string) {
	return focused ? draft : text ?? "";
}
