export type TransportGlyph = "play" | "pause" | "previous" | "next";

export function isTransportGlyph(name: string): name is TransportGlyph {
	return name === "play" || name === "pause" || name === "previous" || name === "next";
}

export interface GlyphRect {
	x: number;
	y: number;
	w: number;
	h: number;
}

function wedge(size: number, pointRight: boolean): GlyphRect[] {
	const steps = 6;
	const h = math.max(1, math.floor(size / steps));
	const mid = (steps - 1) / 2;
	const parts = new Array<GlyphRect>();
	for (let i = 0; i < steps; i++) {
		const reach = 1 - math.abs(i - mid) / mid;
		const w = math.max(1, math.floor(reach * size));
		const x = pointRight ? 0 : size - w;
		parts.push({ x, y: i * h, w, h });
	}
	return parts;
}

/** Play, pause, previous, and next as a few rectangles. Not an icon font. */
export function transportGlyph(name: TransportGlyph, size = 16): GlyphRect[] {
	const box = math.max(4, math.floor(size));
	if (name === "pause") {
		const bar = math.max(2, math.floor(box / 5));
		const gap = bar;
		const span = bar * 2 + gap;
		const x0 = math.floor((box - span) / 2);
		return [
			{ x: x0, y: 0, w: bar, h: box },
			{ x: x0 + bar + gap, y: 0, w: bar, h: box },
		];
	}
	if (name === "play") return wedge(box, true);
	const bar = math.max(2, math.floor(box / 6));
	const mark = { x: name === "previous" ? 0 : box - bar, y: 0, w: bar, h: box };
	const inner = math.max(4, box - bar - 1);
	const shift = name === "previous" ? bar + 1 : 0;
	const moved = new Array<GlyphRect>();
	for (const part of wedge(inner, name !== "previous")) {
		moved.push({ x: part.x + shift, y: part.y, w: part.w, h: part.h });
	}
	return [mark, ...moved];
}
