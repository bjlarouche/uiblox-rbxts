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

const { listItemLabelLayout, listItemSecondaryLayout, listItemCopyInset, listItemTrailInset, listItemRowInset, listItemFill } = await import(
	pathToFileURL(join(root, "src/ui/packages/listItem/components/listItemLayout.ts")).href,
);
const wrapped = listItemLabelLayout(true);
if (wrapped.widthScale !== 1 || wrapped.wrapped !== true || wrapped.truncate !== false) throw new Error("wrap fills the row");
const plain = listItemLabelLayout();
if (plain.widthScale !== 1 || plain.wrapped !== false || plain.truncate !== true) throw new Error("plain stays one line");
if (listItemLabelLayout(false).wrapped !== false || listItemLabelLayout(false).truncate !== true) throw new Error("wrap false");
const secondary = listItemSecondaryLayout();
if (secondary.widthScale !== 1 || secondary.wrapped !== true || secondary.truncate !== false) throw new Error("secondary wraps");
if (listItemCopyInset(true) !== 40) throw new Error("leading inset");
if (listItemCopyInset() !== 0 || listItemCopyInset(false) !== 0) throw new Error("no leading inset");
if (listItemTrailInset() !== 0 || listItemTrailInset(false) !== 0 || listItemTrailInset(true) !== 48) throw new Error("trail inset");
if (listItemRowInset(true) !== 48 || listItemRowInset(false, true) !== 56 || listItemRowInset(true, true) !== 104) {
	throw new Error("row inset");
}

const rest = { disabled: false, selected: false, hover: false, down: false };
if (listItemFill(rest) !== "clear") throw new Error("rest row");
if (listItemFill({ ...rest, selected: true }) !== "selected") throw new Error("selected row");
if (listItemFill({ ...rest, selected: true, hover: true }) !== "hover") throw new Error("hover covers selected");
if (listItemFill({ ...rest, hover: true, down: true }) !== "pressed") throw new Error("press covers hover");
if (listItemFill({ disabled: true, selected: true, hover: true, down: true }) !== "clear") throw new Error("disabled row");

console.log("list item ok");
