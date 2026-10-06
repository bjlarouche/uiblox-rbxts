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
