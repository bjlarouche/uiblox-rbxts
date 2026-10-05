export type GridCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export function gridMaxCells(columns?: number, maxColumns?: number, fillDirectionMaxCells?: number) {
	if (columns !== undefined) return columns;
	if (maxColumns !== undefined) return maxColumns;
	return fillDirectionMaxCells === undefined ? 0 : fillDirectionMaxCells;
}

export function gridCornerKey(corner?: GridCorner): GridCorner {
	if (corner === "top-right" || corner === "bottom-left" || corner === "bottom-right") return corner;
	return "top-left";
}
