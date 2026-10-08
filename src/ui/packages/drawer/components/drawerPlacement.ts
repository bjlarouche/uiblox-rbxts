export type DrawerEdge = "left" | "right" | "bottom";

export function drawerAnchor(edge: DrawerEdge) {
	return edge === "left" ? 0 : 1;
}

export interface DrawerBox {
	anchorX: number;
	anchorY: number;
	posX: number;
	posY: number;
	sizeX: number;
	sizeXO: number;
	sizeY: number;
	sizeYO: number;
}

/** Side drawers keep a column. A bottom sheet spans the width and sits on the lower edge. */
export function drawerBox(edge: DrawerEdge, span: number): DrawerBox {
	const size = span > 0 ? span : 160;
	if (edge === "bottom") {
		return { anchorX: 0, anchorY: 1, posX: 0, posY: 1, sizeX: 1, sizeXO: 0, sizeY: 0, sizeYO: size };
	}
	const side = drawerAnchor(edge);
	return { anchorX: side, anchorY: 0, posX: side, posY: 0, sizeX: 0, sizeXO: size, sizeY: 1, sizeYO: 0 };
}
