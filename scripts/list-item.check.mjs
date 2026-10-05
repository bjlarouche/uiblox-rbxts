import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const theme of ["Dark", "Light"]) {
	for (const name of ["default", "selected", "disabled", "secondary"]) {
		const hit = stateMatrix.some(
			(row) => row.component === "ListItem" && row.theme === theme && row.name.includes(`ListItem-${name}-`),
		);
		if (!hit) throw new Error(`ListItem missing ${name} ${theme}`);
	}
}
if (!stateMatrix.some((row) => row.component === "ListItem" && row.value === true)) {
	throw new Error("ListItem missing selected value");
}
if (!stateMatrix.some((row) => row.component === "ListItem" && row.disabled === true)) {
	throw new Error("ListItem missing disabled");
}
if (!stateMatrix.some((row) => row.component === "ListItem" && row.variant === "secondary")) {
	throw new Error("ListItem missing secondary");
}

console.log("list item ok");
