import { readFileSync } from "node:fs";
import { join } from "node:path";

const toggle = readFileSync(join(process.cwd(), "src/ui/packages/toggleButton/components/ToggleButton.tsx"), "utf8");
if (!toggle.includes("focusRing")) throw new Error("toggle focus should be a ring");
if (!toggle.includes("action.hover") || !toggle.includes("action.selected")) throw new Error("toggle hover and selected should be different faces");
if (!toggle.includes("controlFade")) throw new Error("toggle disabled fade");
if (toggle.includes("0.15")) throw new Error("toggle hover is not a focus wash");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const [component, name] of [
	["ToggleButton", "default"],
	["ToggleButton", "selected"],
	["ToggleButton", "disabled"],
	["ToggleButton", "size-small"],
	["ToggleButtonGroup", "default"],
	["ToggleButtonGroup", "selected"],
	["ToggleButtonGroup", "vertical"],
]) {
	if (!stateMatrix.some((row) => row.component === component && row.name.includes(name))) {
		throw new Error(`${component} missing ${name}`);
	}
}

console.log("toggle-button ok");
