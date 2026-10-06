import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

globalThis.math = {
	floor: (n) => Math.floor(n),
};
String.prototype.size = function size() {
	return this.length;
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const styles = readFileSync(join(root, "src/ui/packages/imageList/components/ImageList.styles.ts"), "utf8");
const tileBlock = styles.match(/tile:\s*\{[\s\S]*?\}\s*as WriteableStyle<ImageButton>/)?.[0];
if (tileBlock === undefined) throw new Error("missing tile style");
if (/\bText\s*:/.test(tileBlock)) throw new Error("ImageButton tile must not set Text");

const component = readFileSync(join(root, "src/ui/packages/imageList/components/ImageList.tsx"), "utf8");
if (!/<>\s*\n\s*\{items\.map/.test(component) && !/<>\s*\{items\.map/.test(component)) {
	throw new Error("ImageList items.map must be wrapped in a fragment");
}

const { imageListTitle } = await import("../src/ui/packages/imageList/components/imageListLayout.ts");
if (imageListTitle(undefined) !== undefined) throw new Error("missing title");
if (imageListTitle("") !== undefined) throw new Error("empty title");
if (imageListTitle("Cove") !== "Cove") throw new Error("title");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["titled", "untitled"]) {
	const rows = stateMatrix.filter(
		(row) => row.component === "ImageList" && row.name.includes(`ImageList-${name}-`),
	);
	if (rows.length !== 2) throw new Error(`ImageList missing ${name}`);
}

console.log("image list ok");
