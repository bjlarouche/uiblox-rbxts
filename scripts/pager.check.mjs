import { readFileSync } from "node:fs";

const { pagerLabel, pagerPlace, pagerStep } = await import("../src/ui/packages/pager/components/pagerStep.ts");

if (pagerPlace(-1, 3) !== 0) throw new Error("low");
if (pagerPlace(4, 3) !== 2) throw new Error("high");
if (pagerPlace(1, 0) !== 0) throw new Error("empty");
if (pagerStep(0, 3, -1) !== 0) throw new Error("back stuck");
if (pagerStep(0, 3, 1) !== 1) throw new Error("forward");
if (pagerStep(2, 3, 1) !== 2) throw new Error("next stuck");
if (pagerLabel(0, 3) !== "1 / 3") throw new Error("label");
if (pagerLabel(0, 0) !== "0 / 0") throw new Error("empty label");

const styles = readFileSync("src/ui/packages/pager/components/Pager.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/pager/components/Pager.tsx", "utf8");
if (!styles.includes('"Pager"')) throw new Error("override name");
if (!view.includes("<SxHost")) throw new Error("sx host");

console.log("pager ok");
