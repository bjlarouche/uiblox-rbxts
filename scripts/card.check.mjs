import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);
const { cardActionWrap, cardColumnWidth, cardTitleWrap } = await import(pathToFileURL(join(root, "src/ui/packages/card/components/cardWidth.ts")).href);
const fluid = cardColumnWidth(true, 256);
const fixed = cardColumnWidth(undefined, 256);
if (fluid.scale !== 1 || fluid.offset !== 0) throw new Error("fluid card width");
if (fixed.scale !== 0 || fixed.offset !== 256 || cardColumnWidth(false, 256).offset !== 256) throw new Error("fixed card width");
if (cardTitleWrap(200, 128) !== true) throw new Error("long card title wraps");
if (cardTitleWrap(80, 128) !== false) throw new Error("short card title stays");
if (cardTitleWrap(200, 0) !== false) throw new Error("unmeasured card title");
if (cardActionWrap(128, 96, 2, 4) !== true) throw new Error("two card actions wrap");
if (cardActionWrap(128, 96, 1, 4) !== false) throw new Error("one card action stays");
if (cardActionWrap(480, 96, 2, 4) !== false) throw new Error("wide card actions stay");

for (const variant of ["flat", "raised", "square"]) {
	if (!stateMatrix.some((row) => row.component === "Card" && row.variant === variant && row.theme === "Dark")) {
		throw new Error(`Card missing ${variant} dark`);
	}
	if (!stateMatrix.some((row) => row.component === "Card" && row.variant === variant && row.theme === "Light")) {
		throw new Error(`Card missing ${variant} light`);
	}
}

const cardStyles = readFileSync(join(root, "src/ui/packages/card/components/Card.styles.ts"), "utf8");
const cardTitle = cardStyles.slice(cardStyles.indexOf("title:"), cardStyles.indexOf("subtitle:"));
if (!cardStyles.includes("variants.h6") || !cardTitle.includes("heading.family") || !cardTitle.includes("heading.leading") || cardTitle.includes("fontFamilies.default")) {
	throw new Error("card title face");
}

console.log("card ok");
