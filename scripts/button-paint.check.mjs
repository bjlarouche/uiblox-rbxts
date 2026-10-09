const { buttonPaint } = await import("../src/ui/packages/button/components/buttonPaint.ts");
import { readFileSync } from "node:fs";

const rest = buttonPaint({ variant: "contained", branded: true, disabled: false, hover: false, down: false });
if (rest.fill !== "primary" || rest.label !== "onPrimary" || rest.fillTransparency !== 0) throw new Error("primary rest");

const hover = buttonPaint({ variant: "contained", branded: true, disabled: false, hover: true, down: false });
if (hover.fill !== "primaryHover" || hover.fillTransparency !== 0) throw new Error("primary hover");

const down = buttonPaint({ variant: "contained", branded: true, disabled: false, hover: true, down: true });
if (down.fill !== "primaryPressed" || down.fillTransparency !== 0) throw new Error("primary pressed");

const ink = buttonPaint({ variant: "contained", branded: false, disabled: false, hover: false, down: false });
if (ink.fill !== "ink" || ink.label !== "inverse") throw new Error("ink rest");

const inkHover = buttonPaint({ variant: "contained", branded: false, disabled: false, hover: true, down: false });
if (inkHover.fill !== "actionHover" || inkHover.label !== "ink") throw new Error("ink hover");

const outlined = buttonPaint({ variant: "outlined", branded: true, disabled: false, hover: false, down: false });
if (outlined.fill !== "none" || outlined.fillTransparency !== 1 || outlined.label !== "primary") throw new Error("outlined rest");

const outlinedHover = buttonPaint({ variant: "text", branded: false, disabled: false, hover: true, down: false });
if (outlinedHover.fill !== "actionHover" || outlinedHover.label !== "ink" || outlinedHover.fillTransparency !== 0) {
	throw new Error("text hover");
}

const off = buttonPaint({ variant: "contained", branded: true, disabled: true, hover: true, down: true });
if (off.fillTransparency >= 0.75 || off.fillTransparency <= 0 || off.label !== "onPrimary") throw new Error("disabled wash");

const offText = buttonPaint({ variant: "outlined", branded: true, disabled: true, hover: true, down: false });
if (offText.fill !== "none" || offText.label !== "disabled") throw new Error("disabled outline");

const view = readFileSync("src/ui/packages/button/components/Button.tsx", "utf8");
if (view.includes("0.75")) throw new Error("button still washes the face");
if (!view.includes("buttonPaint")) throw new Error("button paint");
if (view.includes("hovering || focused")) throw new Error("focus still paints as hover");

console.log("button paint ok");
