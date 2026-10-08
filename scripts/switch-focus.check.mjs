import { readFileSync } from "node:fs";

const styles = readFileSync("src/ui/packages/switch/components/Switch.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/switch/components/Switch.tsx", "utf8");
if (!styles.includes("focusRing(")) throw new Error("switch style");
if (!view.includes("stroke")) throw new Error("switch stroke");

console.log("switch focus ok");
