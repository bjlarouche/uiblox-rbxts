import { readFileSync } from "node:fs";

const styles = readFileSync("src/ui/packages/popover/components/Popover.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/popover/components/Popover.tsx", "utf8");
if (!styles.includes('"Popover"')) throw new Error("override name");
if (!view.includes("open !== true")) throw new Error("closed");
if (!view.includes("<Popup")) throw new Error("popup");
if (!view.includes("<SxHost")) throw new Error("sx host");
if (!view.includes("sx={sx}")) throw new Error("sx");

console.log("popover ok");
