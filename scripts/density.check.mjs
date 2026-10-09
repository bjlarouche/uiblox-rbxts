import { join } from "node:path";
import { readFileSync } from "node:fs";

const root = process.cwd();

const numberConstants = readFileSync(join(root, "src/theme/constants/NumberConstants.ts"), "utf8");
const fontSizes = readFileSync(join(root, "src/theme/interfaces/typography/FontSizes.ts"), "utf8");
const typographyVariants = readFileSync(join(root, "src/theme/interfaces/typography/Variants.ts"), "utf8");
const buttonStyles = readFileSync(join(root, "src/ui/packages/button/components/Button.styles.ts"), "utf8");

const spacing = numberConstants.match(/export const SPACING_BASE = (\d+)/);
const padding = numberConstants.match(/export const PADDING_BASE = (\d+)/);
if (!spacing || Number(spacing[1]) !== 8) throw new Error(`SPACING_BASE miss 8`);
if (!padding || Number(padding[1]) !== 4) throw new Error(`PADDING_BASE miss 4`);
if (!/small:\s*16/.test(numberConstants) || !/medium:\s*24/.test(numberConstants) || !/large:\s*32/.test(numberConstants)) {
	throw new Error("ICON_SIZES miss 16/24/32");
}

const body = typographyVariants.match(/body:\s*\{\s*size:\s*(\d+)/);
if (!body || Number(body[1]) !== 14) throw new Error("body size miss 14");
if (!fontSizes.includes("allTypographyVariants.body.size") && !/baseFontSize = 14/.test(fontSizes)) {
	throw new Error("baseFontSize must follow body variant (14)");
}
if (!/button:\s*\{\s*size:\s*13/.test(typographyVariants) || !/caption:\s*\{\s*size:\s*12/.test(typographyVariants) || !/h1:\s*\{\s*size:\s*28/.test(typographyVariants)) {
	throw new Error("typography scale miss button 13 / caption 12 / h1 28");
}

if (buttonStyles.includes('size = "small"')) {
	throw new Error("Button must follow theme.density when size is unset");
}

const { controlMetrics } = await import("../src/theme/interfaces/density/controlMetrics.ts");
if (controlMetrics(undefined, "small").height !== 22 || controlMetrics("compact").height !== 22) throw new Error("small step");
if (controlMetrics(undefined, "medium").height !== 24) throw new Error("medium step");
if (controlMetrics(undefined, "large").height !== 36) throw new Error("large step");
if (controlMetrics(undefined, "small").font !== 13 || controlMetrics(undefined, "large").font !== 16) throw new Error("step font");
const smallTrack = controlMetrics("compact");
const largeTrack = controlMetrics(undefined, "large");
if (smallTrack.checkbox !== 16 || smallTrack.switchTrackH !== 18 || smallTrack.radio !== 14 || smallTrack.sliderTrack !== 4) {
	throw new Error("compact tracks");
}
if (largeTrack.checkbox !== 24 || largeTrack.switchTrackH !== 36 || largeTrack.radio !== 22 || largeTrack.sliderTrack !== 8) {
	throw new Error("large tracks");
}
for (const [file, token] of [
	["checkbox/components/Checkbox.styles.ts", "metrics.checkbox"],
	["switch/components/Switch.styles.ts", "metrics.switchTrackH"],
	["radioGroup/components/RadioGroup.styles.ts", "metrics.radio"],
	["slider/components/Slider.styles.ts", "metrics.sliderTrack"],
]) {
	const source = readFileSync(join(root, "src/ui/packages", file), "utf8");
	if (!source.includes("controlMetrics(") || !source.includes(token)) throw new Error(token);
}
const numberInput = readFileSync(join(root, "src/ui/packages/numberInput/components/NumberInput.tsx"), "utf8");
if (numberInput.includes("fromOffset(28, 28)")) throw new Error("stepper stays 28");
if (!numberInput.includes("metrics.height") || !numberInput.includes("metrics.font")) throw new Error("stepper scale");

console.log("density ok");
