const { rowSelected } = await import("../src/ui/packages/table/components/rowSelected.ts");
if (rowSelected(1, 1) !== true || rowSelected(0, 1) !== false || rowSelected(0, undefined) !== false) {
	throw new Error("row selected");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["empty", "default", "selected"]) {
	if (stateMatrix.filter((row) => row.component === "Table" && row.name.includes(name)).length !== 2) {
		throw new Error(`Table missing ${name}`);
	}
}

console.log("table ok");
