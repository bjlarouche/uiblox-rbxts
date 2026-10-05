export function inputInsets(hasStart: boolean, hasEnd: boolean, icon: number, gap: number) {
	return {
		left: (hasStart ? icon : 0) + gap,
		right: (hasEnd ? icon : 0) + gap,
	};
}
