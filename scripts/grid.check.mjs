const { gridMaxCells, gridCornerKey } = await import("../src/ui/packages/layout/components/gridProps.ts");

if (gridMaxCells() !== 0 || gridMaxCells(3) !== 3) throw new Error("columns");
if (gridMaxCells(undefined, 4) !== 4 || gridMaxCells(undefined, undefined, 2) !== 2) throw new Error("aliases");
if (gridMaxCells(5, 4, 2) !== 5) throw new Error("columns wins");
if (gridCornerKey() !== "top-left" || gridCornerKey("bottom-right") !== "bottom-right") throw new Error("corner");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["columns-3", "start-bottom-right", "gap"]) {
	if (!stateMatrix.some((row) => row.component === "Grid" && row.name.includes(name))) {
		throw new Error(`Grid missing ${name}`);
	}
}

console.log("grid ok");
