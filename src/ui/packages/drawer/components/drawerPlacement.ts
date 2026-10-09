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

/** Keep the panel on its edge and leave the scrim visible. */
export function drawerFit(edge: DrawerEdge, span: number, limit: number): DrawerBox {
	const box = drawerBox(edge, span);
	const room = limit > 0 ? limit : 0;
	if (edge === "bottom") {
		const size = room > 0 && box.sizeYO > room ? room : box.sizeYO;
		return { ...box, sizeYO: size };
	}
	const size = room > 0 && box.sizeXO > room ? room : box.sizeXO;
	return { ...box, sizeXO: size };
}
