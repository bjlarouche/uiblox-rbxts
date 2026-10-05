import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const theme of ["Dark", "Light"]) {
	if (!stateMatrix.some((row) => row.component === "Menu" && row.theme === theme && row.open === true)) {
		throw new Error(`Menu missing open ${theme}`);
	}
	if (!stateMatrix.some((row) => row.component === "Menu" && row.theme === theme && row.open === false)) {
		throw new Error(`Menu missing closed ${theme}`);
	}
	if (!stateMatrix.some((row) => row.component === "Menu" && row.theme === theme && row.name.includes("empty"))) {
		throw new Error(`Menu missing empty ${theme}`);
	}
}

console.log("menu ok");
