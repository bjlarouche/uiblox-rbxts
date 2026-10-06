Array.prototype.size = function size() {
	return this.length;
};

globalThis.math = {
	abs: Math.abs,
	min: Math.min,
	max: Math.max,
	sqrt: Math.sqrt,
	atan2: Math.atan2,
	deg: (value) => (value * 180) / Math.PI,
};

const { sparklineLayout } = await import("../src/ui/packages/sparkline/sparklineLayout.ts");

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

console.log("sparkline ok");
