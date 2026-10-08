import { readFileSync } from "node:fs";

const slider = readFileSync("src/ui/packages/slider/components/Slider.styles.ts", "utf8");
const range = readFileSync("src/ui/packages/slider/components/RangeSlider.styles.ts", "utf8");
const view = readFileSync("src/ui/packages/slider/components/Slider.tsx", "utf8");
if (!slider.includes("focusRing(")) throw new Error("slider style");
if (!range.includes("focusRing(")) throw new Error("range style");
if (!view.includes("{...stroke}")) throw new Error("slider stroke");

console.log("slider focus ok");
