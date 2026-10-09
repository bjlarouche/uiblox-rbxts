export type ListItemFill = "clear" | "hover" | "pressed" | "selected";

export function listItemFill(input: { disabled: boolean; selected: boolean; hover: boolean; down: boolean }): ListItemFill {
	if (input.disabled) return "clear";
	if (input.down) return "pressed";
	if (input.hover) return "hover";
	if (input.selected) return "selected";
	return "clear";
}

export interface ListItemLabelLayout {
	widthScale: number;
	wrapped: boolean;
}

/** Wrapped rows fill the list. Shrink-wrapped rows stay one line for menus. */
export function listItemLabelLayout(wrap?: boolean): ListItemLabelLayout {
	if (wrap === true) return { widthScale: 1, wrapped: true };
	return { widthScale: 0, wrapped: false };
}

/** Pixels the title column yields when a leading avatar or icon is present. */
export function listItemCopyInset(leading?: boolean) {
	return leading === true ? 40 : 0;
}

/** Pixels reserved for a control on the far side of the row. */
export function listItemTrailInset(trailing?: boolean) {
	return trailing === true ? 48 : 0;
}

/** Title column inset, including the gaps beside any side slots. */
export function listItemRowInset(leading?: boolean, trailing?: boolean) {
	const lead = listItemCopyInset(leading);
	const trail = listItemTrailInset(trailing);
	let gaps = 0;
	if (lead > 0) gaps += 8;
	if (trail > 0) gaps += 8;
	return lead + trail + gaps;
}
