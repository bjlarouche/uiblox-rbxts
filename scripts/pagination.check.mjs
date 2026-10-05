globalThis.math = { max: Math.max, floor: Math.floor };
Array.prototype.size = function size() { return this.length; };

const { pageRange } = await import("../src/ui/packages/pagination/components/pageRange.ts");
if (pageRange(3).join(",") !== "1,2,3" || pageRange(-1).size() !== 0) throw new Error("range");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["first", "middle", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "Pagination" && row.name.includes(name)).length !== 2) {
		throw new Error(`Pagination missing ${name}`);
	}
}
console.log("pagination ok");
