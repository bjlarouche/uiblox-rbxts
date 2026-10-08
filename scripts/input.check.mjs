import { join } from "node:path";
import { pathToFileURL } from "node:url";

String.prototype.size = function size() {
	return this.length;
};
String.prototype.sub = function sub(start, finish) {
	return this.slice(start - 1, finish);
};

const { clampText } = await import("../src/ui/packages/input/components/clampText.ts");
if (clampText("pier lamp") !== "pier lamp" || clampText("pier lamp", -1) !== "pier lamp") throw new Error("open limit");
if (clampText("pier lamp", 4) !== "pier" || clampText("pier", 4) !== "pier") throw new Error("capped");
if (clampText("pier", 0) !== "") throw new Error("empty cap");

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const theme of ["dark", "light"]) {
	if (!stateMatrix.some((row) => row.component === "Input" && row.name === `Input-readonly-${theme}`)) {
		throw new Error(`Input missing readonly ${theme}`);
	}
}

console.log("input ok");
