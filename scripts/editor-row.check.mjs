import { readFileSync } from "node:fs";

const face = readFileSync("src/ui/packages/editorFace.ts", "utf8");
if (!face.includes("controlMetrics(theme.density, size).height")) throw new Error("row height follows the field");
if (!face.includes("TextYAlignment.Center")) throw new Error("editor label centers on the field");

const vector = readFileSync("src/ui/packages/vectorEditor/components/VectorEditor.tsx", "utf8");
if (vector.includes(", 32)")) throw new Error("vector row is hardcoded");

for (const file of [
	"src/ui/packages/vectorEditor/components/VectorEditor.styles.ts",
	"src/ui/packages/udimEditor/components/UDimEditor.styles.ts",
	"src/ui/packages/numberRangeEditor/components/NumberRangeEditor.styles.ts",
]) {
	if (!readFileSync(file, "utf8").includes("editorRowHeight(theme)")) throw new Error(`${file} row height`);
}
const cframe = readFileSync("src/ui/packages/cframeEditor/components/CFrameEditor.styles.ts", "utf8");
if (!cframe.includes('editorRowHeight(theme, "small")')) throw new Error("cframe row uses the small field");

console.log("editor row ok");
