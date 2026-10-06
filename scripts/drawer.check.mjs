import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/ui/packages/drawer/components/Drawer.tsx"), "utf8");
if (!source.includes('key="DrawerAnchor"')) throw new Error("missing drawer portal anchor");
if (!source.includes("portalTarget(host ?? anchor.current)")) throw new Error("drawer must resolve layer from host or anchor");

const { drawerAnchor } = await import("../src/ui/packages/drawer/components/drawerPlacement.ts");
if (drawerAnchor("left") !== 0 || drawerAnchor("right") !== 1) throw new Error("placement");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "left", "right", "wide"]) {
	if (stateMatrix.filter((row) => row.component === "Drawer" && row.name.includes(name)).length !== 2) {
		throw new Error(`Drawer missing ${name}`);
	}
}

console.log("drawer ok");
