export type ButtonGroupEdge = "only" | "start" | "middle" | "end";

export function buttonGroupEdge(index: number, count: number): ButtonGroupEdge {
	if (count <= 1 || index < 0) return "only";
	if (index === 0) return "start";
	if (index >= count - 1) return "end";
	return "middle";
}
