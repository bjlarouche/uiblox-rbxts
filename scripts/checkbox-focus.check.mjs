import { readFileSync } from "node:fs";

const styles = readFileSync("src/ui/packages/checkbox/components/Checkbox.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/checkbox/components/Checkbox.tsx", "utf8");
if (!styles.includes("focusRing(")) throw new Error("checkbox style");
if (!view.includes("pointer === \"focus\" ? focus")) throw new Error("checkbox ring");

console.log("checkbox focus ok");
