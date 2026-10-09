import { readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const variant of ["flat", "raised", "square", "outlined"]) {
	if (!stateMatrix.some((row) => row.component === "Paper" && row.variant === variant && row.theme === "Dark")) {
		throw new Error(`Paper missing ${variant} dark`);
	}
	if (!stateMatrix.some((row) => row.component === "Paper" && row.variant === variant && row.theme === "Light")) {
		throw new Error(`Paper missing ${variant} light`);
	}
}

const paper = readFileSync(join(root, "src/ui/packages/paper/components/Paper.tsx"), "utf8");
if (!paper.includes('elevation === "raised" && <Shadow />')) {
	throw new Error("Paper raised should mount Shadow");
}
if (!paper.includes('key="Content"')) throw new Error("Paper content should hold the padding");
const paperStyles = readFileSync(join(root, "src/ui/packages/paper/components/Paper.styles.ts"), "utf8");
if (!paperStyles.includes("theme.spacing.calc(2)")) throw new Error("Paper padding should be the surface inset");

console.log("paper ok");
