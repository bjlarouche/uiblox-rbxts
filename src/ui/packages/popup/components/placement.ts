export function popupPlacement(
	anchorX: number,
	anchorY: number,
	anchorW: number,
	anchorH: number,
	layerX: number,
	layerY: number,
	layerH: number,
) {
	const x = anchorX - layerX;
	const y = anchorY - layerY;
	const above = y + anchorH / 2 > layerH / 2;
	return { x, y: above ? y : y + anchorH, width: anchorW, above };
}
