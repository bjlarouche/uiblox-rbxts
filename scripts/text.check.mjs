import { readFileSync } from "node:fs";

const { textBox } = await import("../src/ui/packages/text/components/textBox.ts");
const box = textBox();
if (box.widthScale !== 0 || box.heightScale !== 0) throw new Error("text fills parent");
if (box.automatic !== "XY") throw new Error("text shrink wrap");

const source = readFileSync("src/ui/packages/text/components/Text.tsx", "utf8");
if (source.includes("new UDim2(1, 0, 1, 0)")) throw new Error("text uses fill size");
const typography = readFileSync("src/ui/packages/typography/components/Typography.styles.ts", "utf8");
if (!typography.includes("new UDim2(1, 0, 1, 0)")) throw new Error("typography fill moved");

console.log("text ok");
