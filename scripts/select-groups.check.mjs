Array.prototype.size = function size() {
	return this.length;
};

const { groupRows, rowForOption } = await import("../src/ui/packages/select/components/selectGroups.ts");

const rows = groupRows([
	{ label: "Apple", group: "Fruit" },
	{ label: "Banana", group: "Fruit" },
	{ label: "Carrot", group: "Veg" },
	{ label: "Plain" },
]);

if (rows.size() !== 6) throw new Error("row count");
if (rows[0].kind !== "header" || rows[0].label !== "Fruit") throw new Error("first header");
if (rows[1].kind !== "option" || rows[1].optionIndex !== 0) throw new Error("apple");
if (rows[2].kind !== "option" || rows[2].optionIndex !== 1) throw new Error("banana shares group");
if (rows[3].kind !== "header" || rows[3].label !== "Veg") throw new Error("second header");
if (rows[5].kind !== "option" || rows[5].optionIndex !== 3) throw new Error("ungrouped");
if (rowForOption(rows, 2) !== 4) throw new Error("row for carrot");

const plain = groupRows([{ label: "One" }, { label: "Two" }]);
if (plain.size() !== 2 || rowForOption(plain, 1) !== 1) throw new Error("no groups");

console.log("select groups ok");
