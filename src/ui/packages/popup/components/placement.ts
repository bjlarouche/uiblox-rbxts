export interface PopupPlace {
	x: number;
	y: number;
	width: number;
	height: number;
	maxHeight: number;
	above: boolean;
}

export function popupPlacement(
	anchorX: number,
	anchorY: number,
	anchorW: number,
	anchorH: number,
	layerX: number,
	layerY: number,
	layerH: number,
	layerW = math.huge,
	contentH = 0,
	contentW = 0,
): PopupPlace {
	const localX = anchorX - layerX;
	const localY = anchorY - layerY;
	const top = math.clamp(localY, 0, layerH);
	const bottom = math.clamp(localY + anchorH, 0, layerH);
	const spaceAbove = top;
	const spaceBelow = math.max(0, layerH - bottom);
	const above = spaceAbove > spaceBelow && (contentH === 0 || contentH > spaceBelow);
	const maxHeight = above ? spaceAbove : spaceBelow;
	let width = contentW > 0 ? contentW : anchorW;
	if (width > layerW) width = math.max(0, layerW);
	let x = localX;
	if (x < 0) x = 0;
	if (x + width > layerW) x = math.max(0, layerW - width);
	const height = contentH > 0 ? math.min(contentH, maxHeight) : 0;
	return {
		x,
		y: above ? top : bottom,
		width,
		height,
		maxHeight,
		above,
	};
}
