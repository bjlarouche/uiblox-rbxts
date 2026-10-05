import { join } from "node:path";
import { readFileSync } from "node:fs";

const root = process.cwd();
const read = (rel) => readFileSync(join(root, rel), "utf8");

const shape = read("src/theme/interfaces/spacing/Shape.ts");
if (!/borderRadius:\s*number/.test(shape) || !/pillScale:\s*number/.test(shape)) {
	throw new Error("Shape must expose borderRadius and pillScale");
}

const variants = read("src/theme/interfaces/typography/Variants.ts");
for (const key of ["h1", "h6", "body", "button", "caption"]) {
	if (!variants.includes(`${key}:`)) throw new Error(`typography variants miss ${key}`);
}
if (!/weight:\s*700/.test(variants) || !/family:\s*"bold"/.test(variants)) {
	throw new Error("h1-like variants need bold + weight");
}

const dark = read("src/theme/themes/DarkTheme.ts");
const light = read("src/theme/themes/LightTheme.ts");
for (const src of [dark, light]) {
	if (!src.includes("pillScale") || !src.includes("variants:")) {
		throw new Error("themes must set shape.pillScale and typography.variants");
	}
}

/** Key surfaces: shape + spacing/padding/controlMetrics; text controls also typography. */
const keyed = [
	["button", "src/ui/packages/button/components/Button.styles.ts", "borderRadius", true],
	["input", "src/ui/packages/input/components/Input.styles.ts", "borderRadius", true],
	["paper", "src/ui/packages/paper/components/Paper.styles.ts", "borderRadius", false],
	["switch", "src/ui/packages/switch/components/Switch.styles.ts", "pillScale", true],
	["chip", "src/ui/packages/chip/components/Chip.styles.ts", "pillScale", true],
];

for (const [name, rel, radiusKey, needsType] of keyed) {
	const src = read(rel);
	if (!src.includes("theme.shape")) throw new Error(`${name} must use theme.shape`);
	if (!src.includes(radiusKey)) throw new Error(`${name} must use shape.${radiusKey}`);
	const usesSpace =
		src.includes("theme.spacing") ||
		src.includes("theme.padding") ||
		src.includes("controlMetrics");
	if (!usesSpace) throw new Error(`${name} must use spacing/padding/controlMetrics`);
	if (needsType && !src.includes("theme.typography") && !src.includes("metrics.font")) {
		throw new Error(`${name} must use typography or controlMetrics font`);
	}
}

const switchStyles = read("src/ui/packages/switch/components/Switch.styles.ts");
if (!switchStyles.includes("palette.primary.main")) {
	throw new Error("Switch on-state must use palette.primary.main");
}
if (!switchStyles.includes("trackOn")) {
	throw new Error("Switch must define trackOn");
}

const look = read("src/ui/packages/switch/components/switchLook.ts");
if (!/scaleX:\s*on\s*\?\s*1\s*:\s*0/.test(look) || !/anchorX:\s*on\s*\?\s*1\s*:\s*0/.test(look)) {
	throw new Error("Switch thumb must sit right when on");
}

console.log("styles ok");
