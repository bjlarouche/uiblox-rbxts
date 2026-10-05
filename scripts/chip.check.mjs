import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const name of ["default", "size-small", "size-large", "selected", "disabled", "deletable"]) {
	for (const theme of ["Dark", "Light"]) {
		const suffix = theme === "Dark" ? "dark" : "light";
		if (!stateMatrix.some((row) => row.component === "Chip" && row.name === `Chip-${name}-${suffix}`)) {
			throw new Error(`Chip missing ${name} ${theme}`);
		}
	}
}

console.log("chip ok");
