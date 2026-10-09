import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
globalThis.typeIs = (value, typeName) => typeof value === typeName;

const { boxPadSides } = await import("../src/ui/packages/layout/components/boxPad.ts");

const all = boxPadSides(2);
if (all.top !== 2 || all.left !== 2) throw new Error("uniform pad");
const xy = boxPadSides({ x: 1, y: 3 });
if (xy.left !== 1 || xy.top !== 3 || xy.right !== 1 || xy.bottom !== 3) throw new Error("xy pad");
const custom = boxPadSides({ top: 4, left: 1 });
if (custom.top !== 4 || custom.left !== 1 || custom.right !== 0) throw new Error("custom pad");

const pad = readFileSync(join(root, "src/ui/packages/layout/components/Pad.tsx"), "utf8");
if (!pad.includes("-(left + right)") || !pad.includes("-(top + bottom)")) throw new Error("pad shrinks the fixed axes");
for (const file of ["Box.tsx", "Stack.tsx", "Grid.tsx"]) {
	const source = readFileSync(join(root, "src/ui/packages/layout/components", file), "utf8");
	if (!source.includes("<Pad")) throw new Error(`${file} content stays inside padding`);
}
const scroll = readFileSync(join(root, "src/ui/packages/scroll/components/ScrollView.tsx"), "utf8");
if (!scroll.includes("1, -(left + right)") || !scroll.includes("withoutPad")) throw new Error("scroll view padding");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["plain", "padded", "paper"]) {
	if (!stateMatrix.some((row) => row.component === "Box" && row.name.includes(name))) {
		throw new Error(`Box missing ${name}`);
	}
}

console.log("box ok");
