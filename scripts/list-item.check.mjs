import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);

for (const theme of ["Dark", "Light"]) {
	for (const name of ["default", "selected", "disabled", "secondary", "dense", "divider"]) {
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
if (!stateMatrix.some((row) => row.component === "ListItem" && row.variant === "dense")) {
	throw new Error("ListItem missing dense");
}
if (!stateMatrix.some((row) => row.component === "ListItem" && row.variant === "divider")) {
	throw new Error("ListItem missing divider");
}

const { listItemLabelLayout, listItemCopyInset } = await import(
	pathToFileURL(join(root, "src/ui/packages/listItem/components/listItemLayout.ts")).href,
);
const wrapped = listItemLabelLayout(true);
if (wrapped.widthScale !== 1 || wrapped.wrapped !== true) throw new Error("wrap fills the row");
const plain = listItemLabelLayout();
if (plain.widthScale !== 0 || plain.wrapped !== false) throw new Error("plain stays one line");
if (listItemLabelLayout(false).wrapped !== false) throw new Error("wrap false");
if (listItemCopyInset(true) !== 40) throw new Error("leading inset");
if (listItemCopyInset() !== 0 || listItemCopyInset(false) !== 0) throw new Error("no leading inset");

console.log("list item ok");
