import { readFileSync } from "node:fs";

const grayStep = (ref) => {
	const [, scale, step] = ref.match(/(Gray|Light|Dark)\[(\d+)\]/);
	return scale === "Dark" ? 130 - Number(step) : Number(step);
};
const colors = readFileSync("src/theme/constants/ColorConstants.ts", "utf8").split("LIGHT_THEME_COLORS")[1];
const theme = readFileSync("src/theme/themes/LightTheme.ts", "utf8");
const background = grayStep(colors.match(/backgroundUIMuted: ([^,]+)/)[1]);
const muted = grayStep(colors.match(/textMuted: ([^,]+)/)[1]);
const secondary = grayStep(theme.match(/secondary: ((?:Gray|Light|Dark)\[\d+\])/)[1]);
if (colors.includes("TODO")) throw new Error("light palette still has TODO tokens");
if (muted <= background + 10) throw new Error("light textMuted blends into backgroundUIMuted");
if (secondary <= background + 10) throw new Error("light text.secondary blends into backgroundUIMuted");
console.log("light text ok");
