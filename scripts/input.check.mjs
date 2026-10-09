import { readFileSync } from "node:fs";
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

const { fieldChrome } = await import("../src/ui/packages/input/components/fieldChrome.ts");
const small = fieldChrome(22, 4);
const medium = fieldChrome(24, 4);
const large = fieldChrome(36, 4);
if (small.height !== 22 || medium.height !== 24 || large.height !== 36) throw new Error("field height");
if (small.padX !== 4 || large.padX !== 4) throw new Error("field pad");

const inputStyles = readFileSync(join(root, "src/ui/packages/input/components/Input.styles.ts"), "utf8");
const selectStyles = readFileSync(join(root, "src/ui/packages/select/components/Select.styles.ts"), "utf8");
const selectView = readFileSync(join(root, "src/ui/packages/select/components/Select.tsx"), "utf8");
const autoView = readFileSync(join(root, "src/ui/packages/autocomplete/components/Autocomplete.tsx"), "utf8");
if (inputStyles.includes('metrics.height + (variant === "standard"')) throw new Error("input grows past the control");
if (!inputStyles.includes("fieldChrome") || !selectStyles.includes("fieldChrome")) throw new Error("shared field chrome");
if (selectStyles.includes("calc(1.5)") || selectView.includes("calc(1.5)")) throw new Error("select pad");
if (!selectStyles.includes("status.error.main")) throw new Error("select error");
if (!autoView.includes("hasError={hasError}") || !autoView.includes("helperText={helperText}")) throw new Error("autocomplete error");

console.log("input ok");
