export function isDismissInput(input: InputObject) {
	const key = input.KeyCode.Name;
	return key === "Escape" || key === "ButtonB";
}
