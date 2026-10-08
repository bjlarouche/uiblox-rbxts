import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { menuIcon, menuRow, menuWidth } = await import(pathToFileURL(join(root, "src/ui/packages/menu/components/menuIcon.ts")).href);
if (menuIcon() !== undefined || menuIcon("") !== undefined) throw new Error("empty menu icon");
if (menuIcon("Save") !== "Save") throw new Error("menu icon");
if (menuRow() !== 28 || menuRow(true) !== 22) throw new Error("menu row");
if (menuRow(false, true) !== 48 || menuRow(true, true) !== 44) throw new Error("icon row");
if (menuWidth(80, true, 8, 40) !== 136) throw new Error("menu grows");
if (menuWidth(10, false, 8, 96) !== 96) throw new Error("menu stays with the anchor");
if (menuWidth(0, false, 0, 0) !== 0) throw new Error("empty menu width");

const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);
const { listItemInk } = await import(pathToFileURL(join(root, "src/ui/packages/listItem/components/listItemInk.ts")).href);

if (listItemInk() !== "primary") throw new Error("menu primary");
if (listItemInk("danger") !== "error") throw new Error("menu danger");
if (listItemInk("danger", true) !== "disabled") throw new Error("menu danger disabled");

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
	if (!stateMatrix.some((row) => row.component === "Menu" && row.theme === theme && row.name.includes("dense"))) {
		throw new Error(`Menu missing dense ${theme}`);
	}
	if (!stateMatrix.some((row) => row.component === "Menu" && row.theme === theme && row.name.includes("selected"))) {
		throw new Error(`Menu missing selected ${theme}`);
	}
}

console.log("menu ok");
