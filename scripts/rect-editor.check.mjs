const { writeRectParts, rectFields } = await import("../src/ui/packages/rectEditor/components/rectValue.ts");
if (rectFields().join(",") !== "MinX,MinY,MaxX,MaxY") throw new Error("fields");
const parts = writeRectParts(0, 1, 2, 3, "MaxX", 9);
if (parts.join(",") !== "0,1,9,3") throw new Error("patch");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled", "narrow"]) {
	if (stateMatrix.filter((row) => row.component === "RectEditor" && row.name.includes(name)).length !== 2) {
		throw new Error(`RectEditor missing ${name}`);
	}
}
const narrowRect = stateMatrix.filter((row) => row.component === "RectEditor" && row.name.includes("narrow"));
if (narrowRect.some((row) => row.width !== 320)) throw new Error("RectEditor narrow width");

const { readFileSync } = await import("node:fs");
const { join } = await import("node:path");
const root = process.cwd();
const editorFiles = [
	"src/ui/packages/editorFace.ts",
	"src/ui/packages/vectorEditor/components/VectorEditor.styles.ts",
	"src/ui/packages/udimEditor/components/UDimEditor.styles.ts",
	"src/ui/packages/rectEditor/components/RectEditor.styles.ts",
	"src/ui/packages/rayEditor/components/RayEditor.styles.ts",
	"src/ui/packages/physicalPropertiesEditor/components/PhysicalPropertiesEditor.styles.ts",
	"src/ui/packages/numberRangeEditor/components/NumberRangeEditor.styles.ts",
	"src/ui/packages/gradientEditor/components/GradientEditor.styles.ts",
	"src/ui/packages/fontEditor/components/FontEditor.styles.ts",
	"src/ui/packages/colorPicker/components/ColorPicker.styles.ts",
	"src/ui/packages/cframeEditor/components/CFrameEditor.styles.ts",
	"src/ui/packages/brickColorPicker/components/BrickColorPicker.styles.ts",
];
for (const file of editorFiles) {
	const source = readFileSync(join(root, file), "utf8");
	if (!source.includes("editorText") || !source.includes("editorPad")) throw new Error(`${file} missing shared editor face`);
	if (/fontSizes\.(body|button)/.test(source) || source.includes("padding.default")) {
		throw new Error(`${file} uses a different type size or padding`);
	}
}
const hosts = [
	"src/ui/packages/vectorEditor/components/VectorEditor.tsx",
	"src/ui/packages/udimEditor/components/UDimEditor.tsx",
	"src/ui/packages/rectEditor/components/RectEditor.tsx",
	"src/ui/packages/rayEditor/components/RayEditor.tsx",
	"src/ui/packages/physicalPropertiesEditor/components/PhysicalPropertiesEditor.tsx",
	"src/ui/packages/numberRangeEditor/components/NumberRangeEditor.tsx",
	"src/ui/packages/gradientEditor/components/GradientEditor.tsx",
	"src/ui/packages/fontEditor/components/FontEditor.tsx",
	"src/ui/packages/colorPicker/components/ColorPicker.tsx",
	"src/ui/packages/colorPicker/components/ColorSequenceEditor.tsx",
	"src/ui/packages/colorPicker/components/NumberSequenceEditor.tsx",
	"src/ui/packages/cframeEditor/components/CFrameEditor.tsx",
	"src/ui/packages/brickColorPicker/components/BrickColorPicker.tsx",
];
for (const file of hosts) {
	const source = readFileSync(join(root, file), "utf8");
	if (!source.includes("useEditorHover") || !source.includes("hover.face")) {
		throw new Error(`${file} missing hover face`);
	}
}
if (!readFileSync(join(root, "src/ui/packages/editorFace.ts"), "utf8").includes("action.hover")) {
	throw new Error("editor hover missing");
}
if (!readFileSync(join(root, "src/ui/packages/editorFace.ts"), "utf8").includes("TextTruncate")) {
	throw new Error("editor text missing truncate");
}

console.log("rect editor ok");
