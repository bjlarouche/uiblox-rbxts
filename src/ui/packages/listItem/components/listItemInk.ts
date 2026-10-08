export type ListItemTone = "danger";

/** Primary label color. Disabled wins over a danger tone. */
export function listItemInk(tone?: ListItemTone, disabled?: boolean) {
	if (disabled === true) return "disabled";
	if (tone === "danger") return "error";
	return "primary";
}
