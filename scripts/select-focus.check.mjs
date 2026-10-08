import { readFileSync } from "node:fs";

const styles = readFileSync("src/ui/packages/select/components/Select.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/select/components/Select.tsx", "utf8");
if (!styles.includes("focusRing(")) throw new Error("select style");
if (!view.includes("styles.focusStroke")) throw new Error("select stroke");

console.log("select focus ok");
