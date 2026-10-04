export function nextChecked(value: boolean, mixed?: boolean) {
	return mixed === true ? true : !value;
}
