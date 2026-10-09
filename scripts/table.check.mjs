import { readFileSync } from "node:fs";
import { join } from "node:path";

const table = readFileSync(join(process.cwd(), "src/ui/packages/table/components/Table.styles.ts"), "utf8");
const tableView = readFileSync(join(process.cwd(), "src/ui/packages/table/components/Table.tsx"), "utf8");
if (!table.includes("variants.h6")) throw new Error("table header should use the heading face");
if (!table.includes("action.hover")) throw new Error("table row should hover");
if (!tableView.includes("styles.band")) throw new Error("table cells should sit inside the pad");
if (tableView.includes("styles.padding")) throw new Error("table padding still lets cells spill");

const { rowSelected } = await import("../src/ui/packages/table/components/rowSelected.ts");
if (rowSelected(1, 1) !== true || rowSelected(0, 1) !== false || rowSelected(0, undefined) !== false) {
	throw new Error("row selected");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["empty", "default", "selected", "dense"]) {
	if (stateMatrix.filter((row) => row.component === "Table" && row.name.includes(name)).length !== 2) {
		throw new Error(`Table missing ${name}`);
	}
}

console.log("table ok");
