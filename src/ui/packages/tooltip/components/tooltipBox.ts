export function tooltipBox(
	textWidth: number,
	textHeight: number,
	titleWidth: number,
	titleHeight: number,
	padX: number,
	padY: number,
	gap: number,
) {
	const width = math.max(textWidth, titleWidth) + padX * 2;
	const height = textHeight + (titleHeight > 0 ? titleHeight + gap : 0) + padY * 2;
	return { width, height };
}
