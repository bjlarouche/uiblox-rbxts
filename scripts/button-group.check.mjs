import { readFileSync } from "node:fs";

const { buttonGroupEdge } = await import("../src/ui/packages/buttonGroup/components/buttonGroupEdge.ts");

if (buttonGroupEdge(0, 1) !== "only") throw new Error("single");
if (buttonGroupEdge(0, 0) !== "only") throw new Error("empty");
if (buttonGroupEdge(0, 3) !== "start") throw new Error("start");
if (buttonGroupEdge(1, 3) !== "middle") throw new Error("middle");
if (buttonGroupEdge(2, 3) !== "end") throw new Error("end");
if (buttonGroupEdge(-1, 3) !== "only") throw new Error("negative");

const styles = readFileSync("src/ui/packages/buttonGroup/components/ButtonGroup.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/buttonGroup/components/ButtonGroup.tsx", "utf8");
if (!styles.includes('"ButtonGroup"')) throw new Error("override name");
if (!view.includes("<SxHost")) throw new Error("sx host");

console.log("button group ok");
