globalThis.math = {
	max: Math.max,
	min: Math.min,
	floor: Math.floor,
	clamp: (n, a, b) => Math.min(b, Math.max(a, n)),
};
Array.prototype.size = function size() {
	return this.length;
};

import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { sliderMarkValues } = await import(pathToFileURL(join(root, "src/ui/packages/slider/components/sliderMarks.ts")).href);
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

if (sliderMarkValues(0, 100, 25, undefined).length !== 0) throw new Error("marks off");
if (sliderMarkValues(0, 100, 25, false).length !== 0) throw new Error("marks false");
const auto = sliderMarkValues(0, 100, 25, true);
if (auto.join(",") !== "0,25,50,75,100") throw new Error(`auto marks ${auto.join(",")}`);
const custom = sliderMarkValues(0, 100, 5, [0, 50, 150]);
if (custom.join(",") !== "0,50") throw new Error(`custom marks ${custom.join(",")}`);

if (!stateMatrix.some((row) => row.component === "Slider" && row.name.includes("marks"))) {
	throw new Error("Slider missing marks matrix");
}
if (stateMatrix.filter((row) => row.component === "Slider" && row.name.includes("accent")).length !== 2) {
	throw new Error("Slider missing accent");
}

console.log("slider ok");
