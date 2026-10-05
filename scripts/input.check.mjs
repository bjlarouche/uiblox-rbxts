import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const theme of ["dark", "light"]) {
	if (!stateMatrix.some((row) => row.component === "Input" && row.name === `Input-readonly-${theme}`)) {
		throw new Error(`Input missing readonly ${theme}`);
	}
}

console.log("input ok");
