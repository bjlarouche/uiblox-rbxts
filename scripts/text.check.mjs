import { readFileSync } from "node:fs";

const { textBox } = await import("../src/ui/packages/text/components/textBox.ts");
const box = textBox();
if (box.widthScale !== 0 || box.heightScale !== 0 || box.wrapped !== false) throw new Error("text fills parent");
if (box.automatic !== "XY") throw new Error("text shrink wrap");
const wrapped = textBox(true);
if (wrapped.widthScale !== 1 || wrapped.heightScale !== 0 || wrapped.automatic !== "Y" || wrapped.wrapped !== true) {
	throw new Error("text wrap");
}
if (textBox(false).automatic !== "XY") throw new Error("wrap off");

const source = readFileSync("src/ui/packages/text/components/Text.tsx", "utf8");
if (source.includes("new UDim2(1, 0, 1, 0)")) throw new Error("text uses fill size");
if (!source.includes("variants.body.leading")) throw new Error("text leading");
if (!source.includes("TextYAlignment.Top")) throw new Error("text top align");
const typography = readFileSync("src/ui/packages/typography/components/Typography.styles.ts", "utf8");
if (!typography.includes("new UDim2(1, 0, 1, 0)")) throw new Error("typography fill moved");
if (typography.includes("ZIndex = 10000")) throw new Error("typography stacks over siblings");
if (!typography.includes("TextYAlignment.Top")) throw new Error("typography top align");
if (!typography.includes("TextTruncate.AtEnd")) throw new Error("typography truncate");
if (!typography.includes("LineHeight: spec.leading")) throw new Error("typography leading");

const variants = readFileSync("src/theme/interfaces/typography/Variants.ts", "utf8");
const leads = [...variants.matchAll(/leading:\s*([0-9.]+)/g)].map((match) => Number(match[1]));
if (leads.length < 12) throw new Error("leading count");
for (const lead of leads) {
	if (lead < 1 || lead > 1.6) throw new Error(`leading ${lead}`);
}

console.log("text ok");
