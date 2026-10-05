export function inputInsets(hasStart: boolean, hasEnd: boolean, icon: number, gap: number) {
	return {
		left: gap + (hasStart ? icon + gap : 0),
		right: gap + (hasEnd ? icon + gap : 0),
	};
}
