globalThis.typeIs = (value, kind) => typeof value === kind;
globalThis.math = { max: Math.max };

const { canSort, columnSizes, headerText, isTextCell, resolveColumn } = await import(
	"../src/ui/packages/table/components/tableColumns.ts"
);

function near(actual, expected, label) {
	if (Math.abs(actual - expected) > 0.001) throw new Error(`${label}: ${actual} != ${expected}`);
}

const equal = columnSizes(["Name", "Role", "Team"].map((label) => resolveColumn(label)));
if (equal.length !== 3) throw new Error("equal count");
near(equal[0].scale, 1 / 3, "equal scale");
near(equal[0].offset, 0, "equal offset");
near(equal[0].scale + equal[1].scale + equal[2].scale, 1, "equal sum");

const fixed = columnSizes([resolveColumn({ header: "A", width: 0.25 }), resolveColumn({ header: "B", width: 0.5 })]);
near(fixed[0].scale, 0.25, "number width");
near(fixed[1].scale, 0.5, "second width");

const flex = columnSizes([resolveColumn({ header: "A", flex: 1 }), resolveColumn({ header: "B", flex: 3 })]);
near(flex[0].scale, 0.25, "flex 1");
near(flex[1].scale, 0.75, "flex 3");

const mixed = columnSizes([
	resolveColumn({ header: "Fixed", width: 0.2 }),
	resolveColumn({ header: "A", flex: 1 }),
	resolveColumn({ header: "B", flex: 3 }),
]);
near(mixed[0].scale, 0.2, "mixed fixed");
near(mixed[1].scale, 0.2, "mixed flex 1");
near(mixed[2].scale, 0.6, "mixed flex 3");

const offset = columnSizes([
	resolveColumn({ header: "Icon", width: { Scale: 0, Offset: 80 } }),
	resolveColumn({ header: "Name" }),
]);
near(offset[0].scale, 0, "udim scale");
near(offset[0].offset, 80, "udim offset");
near(offset[1].scale, 1, "leftover flex");

const spec = resolveColumn({ header: "Role", align: "right", sortable: true, flex: 2 });
if (spec.align !== "right" || spec.sortable !== true || spec.flex !== 2) throw new Error("spec");
const plain = resolveColumn("Name");
if (plain.header !== "Name" || plain.align !== "left" || plain.sortable !== false) throw new Error("string column");

if (!isTextCell("Ada") || !isTextCell(undefined) || isTextCell({})) throw new Error("text cell");

if (headerText("Name", false, "asc") !== "Name") throw new Error("idle header");
if (headerText("Name", true, "asc") !== "Name ↑") throw new Error("asc header");
if (headerText("Name", true, "desc") !== "Name ↓") throw new Error("desc header");
if (!canSort(true, true) || canSort(true, false) || canSort(undefined, true)) throw new Error("sort contract");

console.log("table columns ok");
