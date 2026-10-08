import { readFileSync } from "node:fs";

const styles = readFileSync("src/ui/packages/input/components/Input.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/input/components/Input.tsx", "utf8");
if (!styles.includes("focusRing(")) throw new Error("input style");
if (!view.includes("{...stroke}")) throw new Error("input stroke");
if (!view.includes("weight={focused ? 2")) throw new Error("input underline");

console.log("input focus ok");
