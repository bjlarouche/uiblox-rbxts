export function canActivate(disabled?: boolean, loading?: boolean) {
	return disabled !== true && loading !== true;
}
