import { readFileSync } from "node:fs";

globalThis.Enum = { ApplyStrokeMode: { Border: "Border" } };

const { controlFade, focusRing } = await import("../src/theme/styles/utilities/focusRing.ts");
const ring = focusRing("ink");
if (ring.Color !== "ink") throw new Error("color");
if (ring.Thickness !== 2) throw new Error("thickness");
if (ring.ApplyStrokeMode !== "Border") throw new Error("mode");
if (controlFade !== 0.5) throw new Error("disabled fade");

const styles = readFileSync("src/ui/packages/button/components/Button.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/button/components/Button.tsx", "utf8");
if (!styles.includes("focusRing(")) throw new Error("button style");
if (!view.includes("{...focus}")) throw new Error("button ring");

console.log("focus ring ok");
