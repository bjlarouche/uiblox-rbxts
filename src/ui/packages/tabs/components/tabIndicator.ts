/** Indicator box inside a tab. Horizontal width stays on the tab; a positive width offset spills into the next one. */
export function tabIndicatorBox(vertical: boolean, bar: number, gutter: number) {
	if (vertical) return { widthScale: 0, widthOffset: bar, heightScale: 1, heightOffset: -gutter };
	return { widthScale: 1, widthOffset: 0, heightScale: 0, heightOffset: bar };
}
