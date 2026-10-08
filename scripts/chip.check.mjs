import { join } from "node:path";
import { pathToFileURL } from "node:url";

const { chipTone } = await import("../src/ui/packages/chip/components/chipTone.ts");
if (chipTone() !== "default" || chipTone("primary") !== "primary") throw new Error("plain chip");
if (chipTone("success") !== "success" || chipTone("error") !== "error") throw new Error("status chip");

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const name of ["default", "size-small", "size-large", "selected", "disabled", "deletable", "outlined", "primary"]) {
	for (const theme of ["Dark", "Light"]) {
		const suffix = theme === "Dark" ? "dark" : "light";
		if (!stateMatrix.some((row) => row.component === "Chip" && row.name === `Chip-${name}-${suffix}`)) {
			throw new Error(`Chip missing ${name} ${theme}`);
		}
	}
}

console.log("chip ok");
