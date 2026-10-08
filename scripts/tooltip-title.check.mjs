import { readFileSync } from "node:fs";

globalThis.math = { max: Math.max };

const { tooltipBox } = await import("../src/ui/packages/tooltip/components/tooltipBox.ts");

const plain = tooltipBox(10, 8, 0, 0, 4, 2, 0);
if (plain.width !== 18 || plain.height !== 12) throw new Error("plain");
const titled = tooltipBox(10, 8, 20, 6, 4, 2, 2);
if (titled.width !== 28 || titled.height !== 20) throw new Error("titled");

const view = readFileSync("src/ui/packages/tooltip/components/Tooltip.tsx", "utf8");
if (!view.includes("title?:")) throw new Error("title prop");
if (!view.includes("styles.title")) throw new Error("title label");

console.log("tooltip title ok");
