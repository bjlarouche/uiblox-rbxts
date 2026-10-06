import { readFileSync } from "node:fs";

const src = readFileSync("src/theme/types/types.ts", "utf8");
if (!src.includes("sx?: WriteableStyle<T> & SxInput")) throw new Error("sx prop should accept shorthand");

console.log("sx prop ok");
