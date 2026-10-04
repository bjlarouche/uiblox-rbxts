const SAME_FRAME = 1 / 60;

export function shouldHandleSelectKey(
	open: boolean,
	focused: boolean,
	fromControl: boolean,
	textboxFocused: boolean,
	key: string,
	now: number,
	previous?: { key: string; at: number },
) {
	if (textboxFocused || (!open && !focused && !fromControl)) return false;
	if (previous !== undefined && previous.key === key && now - previous.at < SAME_FRAME) return false;
	return true;
}
