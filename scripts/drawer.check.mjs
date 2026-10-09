import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/ui/packages/drawer/components/Drawer.tsx"), "utf8");
if (!source.includes('key="DrawerAnchor"')) throw new Error("missing drawer portal anchor");
if (!source.includes("portalTarget(host ?? anchor.current)")) throw new Error("drawer must resolve layer from host or anchor");

const { drawerAnchor, drawerBox, drawerFit } = await import("../src/ui/packages/drawer/components/drawerPlacement.ts");
if (drawerAnchor("left") !== 0 || drawerAnchor("right") !== 1) throw new Error("placement");
const sheet = drawerBox("bottom", 280);
if (sheet.anchorY !== 1 || sheet.posY !== 1 || sheet.sizeX !== 1 || sheet.sizeYO !== 280) throw new Error("bottom sheet");
const column = drawerBox("right", 320);
if (column.anchorX !== 1 || column.sizeXO !== 320 || column.sizeY !== 1) throw new Error("side column");
const fitted = drawerFit("right", 400, 240);
if (fitted.sizeXO !== 240 || fitted.anchorX !== 1) throw new Error("side stays on the edge");
const sheetFit = drawerFit("bottom", 500, 180);
if (sheetFit.sizeYO !== 180 || sheetFit.posY !== 1) throw new Error("sheet stays on the edge");
const openFit = drawerFit("left", 200, 0);
if (openFit.sizeXO !== 200) throw new Error("unmeasured drawer");
const styles = readFileSync(join(root, "src/ui/packages/drawer/components/Drawer.styles.ts"), "utf8");
if (!styles.includes("TextWrapped") || !styles.includes("variants.h6") || !styles.includes("text.primary")) throw new Error("drawer title");
if (!source.includes('key="Pad"') || !styles.includes("palette.backdrop")) throw new Error("drawer inset and scrim");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "left", "right", "wide"]) {
	if (stateMatrix.filter((row) => row.component === "Drawer" && row.name.includes(name)).length !== 2) {
		throw new Error(`Drawer missing ${name}`);
	}
}

console.log("drawer ok");
