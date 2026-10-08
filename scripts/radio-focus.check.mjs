import { readFileSync } from "node:fs";

const styles = readFileSync("src/ui/packages/radioGroup/components/RadioGroup.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/radioGroup/components/RadioGroup.tsx", "utf8");
if (!styles.includes("focusRing(")) throw new Error("radio style");
if (!view.includes("SelectionGained")) throw new Error("radio focus");

console.log("radio focus ok");
