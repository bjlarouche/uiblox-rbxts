import { readFileSync } from "node:fs";

const { orderRange, rangeMove, rangeRatios, rangeThumb } = await import(
	"../src/ui/packages/slider/components/rangeValue.ts"
);

const swapped = orderRange(80, 20);
if (swapped.start !== 20 || swapped.finish !== 80) throw new Error("order");
const kept = orderRange(20, 80);
if (kept.start !== 20 || kept.finish !== 80) throw new Error("already ordered");

const ratios = rangeRatios(20, 60, 0, 100);
if (ratios.low !== 0.2 || ratios.high !== 0.6) throw new Error("ratios");
const flipped = rangeRatios(60, 20, 0, 100);
if (flipped.low !== 0.2 || flipped.high !== 0.6) throw new Error("flipped ratios");
const flat = rangeRatios(1, 2, 5, 5);
if (flat.low !== 0 || flat.high !== 0) throw new Error("flat span");

if (rangeThumb(10, 20, 80) !== "low") throw new Error("low thumb");
if (rangeThumb(70, 20, 80) !== "high") throw new Error("high thumb");
if (rangeThumb(50, 20, 80) !== "high") throw new Error("tie thumb");

const slide = rangeMove("low", 30, 20, 80);
if (slide.thumb !== "low" || slide.start !== 30 || slide.finish !== 80) throw new Error("slide low");
const cross = rangeMove("low", 90, 20, 80);
if (cross.thumb !== "high" || cross.start !== 80 || cross.finish !== 90) throw new Error("cross low");
const back = rangeMove("high", 10, 20, 80);
if (back.thumb !== "low" || back.start !== 10 || back.finish !== 20) throw new Error("cross high");

const styles = readFileSync("src/ui/packages/slider/components/RangeSlider.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/slider/components/RangeSlider.tsx", "utf8");
if (!styles.includes('"RangeSlider"')) throw new Error("override name");
if (!view.includes("<SxHost")) throw new Error("sx host");

console.log("range slider ok");
