export type DrawerEdge = "left" | "right";

export function drawerAnchor(edge: DrawerEdge) {
	return edge === "left" ? 0 : 1;
}
