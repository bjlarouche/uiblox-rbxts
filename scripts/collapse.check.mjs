import { readFileSync } from "node:fs";

const { collapseOpen } = await import("../src/ui/packages/collapse/components/collapseOpen.ts");

if (collapseOpen(true) !== true) throw new Error("open");
if (collapseOpen(false) !== false) throw new Error("closed");
if (collapseOpen(undefined) !== false) throw new Error("missing");

const styles = readFileSync("src/ui/packages/collapse/components/Collapse.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/collapse/components/Collapse.tsx", "utf8");
const accordion = readFileSync("src/ui/packages/accordion/components/Accordion.tsx", "utf8");
if (!styles.includes('"Collapse"')) throw new Error("override name");
if (!view.includes("<SxHost") || !view.includes("Visible={collapseOpen(open)}")) throw new Error("sx host");
if (!accordion.includes("<Collapse")) throw new Error("accordion reuse");

console.log("collapse ok");
