globalThis.math = {
	abs: Math.abs,
	floor: Math.floor,
	max: Math.max,
};

import { readFileSync } from "node:fs";

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

const { iconButtonScale, iconGlyphExtent, iconButtonFace } = await import(
	"../src/ui/packages/iconButton/components/iconButtonBox.ts"
);
if (iconButtonScale("xxs") !== 1 || iconButtonScale("xl") !== 5 || iconButtonScale() !== 2) {
	throw new Error("button scale");
}
const smBox = iconGlyphExtent(8 * iconButtonScale("sm"));
if (smBox >= 16 || smBox < 4) throw new Error("small glyph");
if (iconGlyphExtent(8 * iconButtonScale("xl")) <= 16) throw new Error("large glyph stays 16");
const rest = { disabled: false, loading: false, selected: false, hover: false, down: false };
if (iconButtonFace({ ...rest, hover: true }) !== "hover") throw new Error("hover face");
if (iconButtonFace({ ...rest, selected: true, hover: true }) !== "selected") throw new Error("selected face");
if (iconButtonFace({ ...rest, selected: true, hover: true, down: true }) !== "pressed") throw new Error("press face");
if (iconButtonFace({ ...rest, disabled: true, hover: true }) !== "clear") throw new Error("disabled face");
if (iconButtonFace({ ...rest, loading: true, hover: true }) !== "clear") throw new Error("loading face");
if (iconButtonFace(rest) !== "clear") throw new Error("rest face");

const view = readFileSync(new URL("../src/ui/packages/iconButton/components/IconButton.tsx", import.meta.url), "utf8");
if (view.includes("fromOffset(16, 16)")) throw new Error("glyph stays 16");
if (view.includes("hovering || selected || focused")) throw new Error("one wash");
if (!view.includes("focusRing")) throw new Error("focus ring");
if (!view.includes("AutoButtonColor={false}")) throw new Error("auto color");

console.log("transport glyph ok");
