import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const variant of ["flat", "raised", "square"]) {
	if (!stateMatrix.some((row) => row.component === "Card" && row.variant === variant && row.theme === "Dark")) {
		throw new Error(`Card missing ${variant} dark`);
	}
	if (!stateMatrix.some((row) => row.component === "Card" && row.variant === variant && row.theme === "Light")) {
		throw new Error(`Card missing ${variant} light`);
	}
}

console.log("card ok");
