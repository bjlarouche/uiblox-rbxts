export type Glyph =
	| "close"
	| "chevronDown"
	| "chevronRight"
	| "check"
	| "add"
	| "remove"
	| "search"
	| "menu"
	| "more"
	| "error"
	| "warning"
	| "info"
	| "success"
	| "folder"
	| "expand";

/** On a 24-unit grid. Bars run between two points, rings and dots sit on a center, boxes span a corner and size. */
export type GlyphPart =
	| { kind: "bar"; x1: number; y1: number; x2: number; y2: number }
	| { kind: "ring"; x: number; y: number; d: number }
	| { kind: "dot"; x: number; y: number; d: number }
	| { kind: "box"; x: number; y: number; w: number; h: number };

const bar = (x1: number, y1: number, x2: number, y2: number): GlyphPart => ({ kind: "bar", x1, y1, x2, y2 });
const ring = (x: number, y: number, d: number): GlyphPart => ({ kind: "ring", x, y, d });
const dot = (x: number, y: number, d: number): GlyphPart => ({ kind: "dot", x, y, d });
const box = (x: number, y: number, w: number, h: number): GlyphPart => ({ kind: "box", x, y, w, h });

const GLYPHS: Record<Glyph, GlyphPart[]> = {
	close: [bar(6, 6, 18, 18), bar(18, 6, 6, 18)],
	chevronDown: [bar(6, 9, 12, 15), bar(12, 15, 18, 9)],
	chevronRight: [bar(9, 6, 15, 12), bar(15, 12, 9, 18)],
	check: [bar(5, 12.5, 10, 17.5), bar(10, 17.5, 19, 7.5)],
	add: [bar(12, 5, 12, 19), bar(5, 12, 19, 12)],
	remove: [bar(5, 12, 19, 12)],
	search: [ring(10.5, 10.5, 11), bar(15, 15, 19.5, 19.5)],
	menu: [bar(4, 7, 20, 7), bar(4, 12, 20, 12), bar(4, 17, 20, 17)],
	more: [dot(5.5, 12, 3.5), dot(12, 12, 3.5), dot(18.5, 12, 3.5)],
	error: [ring(12, 12, 18), bar(12, 7.5, 12, 12.5), dot(12, 16, 2.5)],
	warning: [bar(12, 4, 21, 19.5), bar(21, 19.5, 3, 19.5), bar(3, 19.5, 12, 4), bar(12, 9.5, 12, 14), dot(12, 17, 2.5)],
	info: [ring(12, 12, 18), dot(12, 8, 2.5), bar(12, 11, 12, 16.5)],
	success: [ring(12, 12, 18), bar(8, 12.5, 11, 15.5), bar(11, 15.5, 16.5, 9)],
	folder: [box(3, 8, 18, 11), box(3, 5, 7, 4)],
	expand: [
		bar(4, 9, 4, 4),
		bar(4, 4, 9, 4),
		bar(15, 4, 20, 4),
		bar(20, 4, 20, 9),
		bar(20, 15, 20, 20),
		bar(20, 20, 15, 20),
		bar(9, 20, 4, 20),
		bar(4, 20, 4, 15),
	],
};

export function glyphParts(name: Glyph): GlyphPart[] {
	return GLYPHS[name];
}

/** Stroke weight for a glyph drawn at `size` pixels. */
export function glyphStroke(size: number) {
	return math.max(1, math.floor(size / 9));
}
