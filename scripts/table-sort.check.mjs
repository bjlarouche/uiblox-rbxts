import { readFileSync } from "node:fs";

Array.prototype.size = function size() {
	return this.length;
};
globalThis.typeIs = (value, kind) => typeof value === kind;
globalThis.tonumber = (value) => {
	if (typeof value !== "string" || value === "") return undefined;
	const numeric = Number(value);
	return Number.isNaN(numeric) ? undefined : numeric;
};

const { sortedRowOrder } = await import("../src/ui/packages/table/components/tableSort.ts");

function same(actual, expected, label) {
	if (actual.join(",") !== expected.join(",")) throw new Error(`${label}: ${actual} != ${expected}`);
}

const rows = [
	["Ada", "10"],
	["Grace", "2"],
	["Lin", "10"],
];
same(sortedRowOrder(rows), [0, 1, 2], "identity");
same(sortedRowOrder(rows, 1, "asc"), [1, 0, 2], "numeric asc");
same(sortedRowOrder(rows, 1, "desc"), [0, 2, 1], "numeric desc");
same(sortedRowOrder(rows, 0, "asc"), [0, 1, 2], "text asc");
same(sortedRowOrder(rows, 0, "desc"), [2, 1, 0], "text desc");

const mixed = [
	["b", "x"],
	["10", "y"],
	["2", "z"],
];
same(sortedRowOrder(mixed, 0, "asc"), [2, 1, 0], "numbers then text");

const blank = [[undefined], ["a"], [""]];
same(sortedRowOrder(blank, 0, "asc"), [0, 2, 1], "blanks first");

const view = readFileSync("src/ui/packages/table/components/Table.tsx", "utf8");
if (!view.includes("sortedRowOrder")) throw new Error("row order");

console.log("table sort ok");
