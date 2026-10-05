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

console.log("density ok");
