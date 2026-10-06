globalThis.math = {
	abs: Math.abs,
	floor: Math.floor,
	max: Math.max,
};

const { transportGlyph } = await import("../src/ui/packages/iconButton/components/transportGlyph.ts");

function widest(parts) {
	let width = 0;
	for (const part of parts) if (part.w > width) width = part.w;
	return width;
}

const play = transportGlyph("play", 16);
if (play.length < 3) throw new Error("play parts");
if (widest(play) <= play[0].w) throw new Error("play point");
for (const part of play) if (part.x !== 0) throw new Error("play faces right");

const pause = transportGlyph("pause", 16);
if (pause.length !== 2) throw new Error("pause bars");
if (pause[0].h !== 16 || pause[1].h !== 16) throw new Error("pause height");
if (pause[1].x < pause[0].x + pause[0].w + 1) throw new Error("pause gap");

const back = transportGlyph("previous", 16);
const bar = back[0];
if (bar.x !== 0 || bar.h !== 16 || bar.w >= 8) throw new Error("previous bar");
let beside = false;
for (const part of back) if (part !== bar && part.x > bar.w) beside = true;
if (!beside) throw new Error("previous mark");

const skip = transportGlyph("next", 16);
const endBar = skip[0];
if (endBar.x + endBar.w !== 16 || endBar.h !== 16) throw new Error("next bar");
let leading = false;
for (const part of skip) if (part.x === 0 && part.w < 16) leading = true;
if (!leading) throw new Error("next mark");

console.log("transport glyph ok");
