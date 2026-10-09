Array.prototype.size = function size() {
	return this.length;
};

globalThis.math = {
	abs: Math.abs,
	min: Math.min,
	max: Math.max,
	sqrt: Math.sqrt,
	floor: Math.floor,
	atan2: Math.atan2,
	deg: (value) => (value * 180) / Math.PI,
};

const { sparklineArea, sparklineIndex, sparklineLayout, sparklinePick } = await import("../src/ui/packages/sparkline/sparklineLayout.ts");

if (sparklineLayout([], 120, 36).length !== 0) throw new Error("empty");
if (sparklineLayout([4], 120, 36).length !== 0) throw new Error("single");

const flat = sparklineLayout([5, 5, 5], 100, 40);
if (flat.length !== 2) throw new Error("flat count");
if (Math.abs(flat[0].rotation) > 0.01) throw new Error("flat rotation");
if (flat[0].length < 40) throw new Error("flat length");

const rise = sparklineLayout([0, 10], 100, 40);
if (rise.length !== 1) throw new Error("rise count");
if (rise[0].rotation >= 0) throw new Error("rise rotation");
if (rise[0].length < 30) throw new Error("rise length");

const drop = sparklineLayout([10, 0], 100, 40);
if (drop[0].rotation <= 0) throw new Error("drop rotation");

if (sparklineArea([], 100, 40).length !== 0 || sparklineArea([4], 100, 40).length !== 0) throw new Error("empty area");
const area = sparklineArea([0, 10], 100, 40);
if (area.length < 4) throw new Error("area slices");
const baseline = area[0].y + area[0].height;
for (const bar of area) {
	if (Math.abs(bar.y + bar.height - baseline) > 0.01) throw new Error("area baseline");
	if (bar.width <= 0) throw new Error("area width");
}
if (area[area.length - 1].height <= area[0].height) throw new Error("area rises");
if (rise[0].height !== undefined) throw new Error("line stays a line");

const count = 5;
const width = 100;
const pad = 4;
const first = pad;
const middle = pad + (width - pad * 2) / 2;
const last = width - pad;
const expect = [
	[first, 0],
	[middle, 2],
	[last, count - 1],
];
for (const pair of expect) {
	const localX = pair[0];
	const sample = pair[1];
	let picked;
	if (sparklineIndex(localX, count, width) !== sample) throw new Error("sample " + sample);
	if (sparklinePick(localX, count, width, (index) => { picked = index; }) !== sample || picked !== sample) {
		throw new Error("pick " + sample);
	}
}
if (sparklinePick(first, count, width) !== undefined) throw new Error("missing pick");

const inset = 6;
const boxed = [0, 10, 1, 9];
for (const segment of sparklineLayout(boxed, 80, 28, inset)) {
	if (segment.x < inset || segment.y < inset || segment.x > 80 - inset || segment.y > 28 - inset) {
		throw new Error("line leaves the box");
	}
}
for (const bar of sparklineArea(boxed, 80, 28, inset)) {
	if (bar.x < 0 || bar.y < 0 || bar.x + bar.width > 80 + 0.01 || bar.y + bar.height > 28 + 0.01) {
		throw new Error("area leaves the box");
	}
}
const { readFileSync } = await import("node:fs");
const spark = readFileSync("src/ui/packages/sparkline/components/Sparkline.tsx", "utf8");
if (!spark.includes("inset") || !spark.includes("ClipsDescendants: true")) throw new Error("sparkline stays in its box");

console.log("sparkline ok");
