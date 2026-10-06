import { readFileSync } from "node:fs";

const src = readFileSync("src/ui/packages/scroll/components/ScrollView.tsx", "utf8");
if (!src.includes('tag="scrollingframe"')) throw new Error("scroll view host");
if (!src.includes("AutomaticCanvasSize: Enum.AutomaticSize.Y")) throw new Error("scroll view canvas");
if (!src.includes("ScrollingDirection: Enum.ScrollingDirection.Y")) throw new Error("scroll view direction");
if (!src.includes("BackgroundTransparency: 1")) throw new Error("scroll view chrome");

const barrel = readFileSync("src/ui/packages/scroll/index.ts", "utf8");
if (!barrel.includes("ScrollView")) throw new Error("scroll view export");

console.log("scroll view ok");
