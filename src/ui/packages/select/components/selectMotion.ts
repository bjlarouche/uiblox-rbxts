export const SELECT_MENU_SECONDS = 0.12;

export function menuHold(open: boolean, reducedMotion?: boolean) {
	if (open || reducedMotion === true) return 0;
	return SELECT_MENU_SECONDS;
}
