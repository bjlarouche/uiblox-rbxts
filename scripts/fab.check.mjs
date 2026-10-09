import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const { fabPixels, fabIconPixels, fabExtended } = await import("../src/ui/packages/fab/components/fabSize.ts");
if (fabPixels("small") !== 40 || fabPixels() !== 56 || fabPixels("large") !== 64) {
	throw new Error("fab pixels");
}
if (fabIconPixels("small") !== 18 || fabIconPixels() !== 24 || fabIconPixels("large") !== 28) {
	throw new Error("fab icon pixels");
}
if (fabExtended() !== false || fabExtended("") !== false || fabExtended("Compose") !== true) {
	throw new Error("fab extended");
}

const fabStyles = readFileSync(join(root, "src/ui/packages/fab/components/Fab.styles.ts"), "utf8");
if (!fabStyles.includes("AutomaticSize.X")) throw new Error("extended fab autosize x");
if (!fabStyles.includes("content:")) throw new Error("fab content host");
if (/Size:\s*UDim2\.fromOffset\(\s*\d{3,}/.test(fabStyles)) throw new Error("fab hardcoded width");

const fabSource = readFileSync(join(root, "src/ui/packages/fab/components/Fab.tsx"), "utf8");
if (!fabSource.includes('key="Content"') || !fabSource.includes("<Shadow />")) {
	throw new Error("fab content wraps list away from shadow");
}

const shadowStyles = readFileSync(join(root, "src/ui/packages/shadow/components/Shadow.styles.ts"), "utf8");
if (shadowStyles.includes("new UDim2(1,")) throw new Error("shadow size must not use scale+offset");
if (!shadowStyles.includes("fromOffset(0, 0)")) throw new Error("shadow host zero size");
if (!shadowStyles.includes("blob:")) throw new Error("shadow blob");

const shadowSource = readFileSync(join(root, "src/ui/packages/shadow/components/Shadow.tsx"), "utf8");
if (!shadowSource.includes('key="Blob"') || !shadowSource.includes("AbsoluteSize")) {
	throw new Error("shadow blob syncs to parent");
}
if (!shadowSource.includes("<scrollingframe") || !shadowSource.includes("ClipsDescendants={false}")) {
	throw new Error("shadow blob sits outside autosize");
}
const shadowAt = shadowSource.indexOf("shadow.Parent = wrap");
const faceAt = shadowSource.indexOf("face.Parent = wrap");
if (!shadowSource.includes('Name = "ShadowWrap"') || shadowAt < 0 || faceAt < shadowAt) {
	throw new Error("shadow behind surface");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "extended", "extended-narrow", "small", "medium", "large", "disabled", "loading", "accent"]) {
	if (!stateMatrix.some((row) => row.component === "Fab" && row.name.includes(name))) {
		throw new Error(`Fab missing ${name}`);
	}
}
const narrow = stateMatrix.filter((row) => row.component === "Fab" && row.name.includes("extended-narrow"));
if (narrow.length !== 2 || narrow.some((row) => row.width !== 128)) throw new Error("Fab extended-narrow width");
const medium = stateMatrix.filter((row) => row.component === "Fab" && row.name.includes("-medium-"));
if (medium.length !== 2 || medium.some((row) => row.size !== "medium")) throw new Error("Fab medium size");

console.log("fab ok");
