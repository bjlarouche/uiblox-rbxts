globalThis.math = { max: Math.max, min: Math.min, floor: Math.floor, clamp: (n, a, b) => Math.min(b, Math.max(a, n)) };
Array.prototype.size = function size() {
	return this.length;
};
Array.prototype.join = Array.prototype.join;

const { pageRange } = await import("../src/ui/packages/pagination/components/pageRange.ts");
if (pageRange(3).join(",") !== "1,2,3" || pageRange(-1).size() !== 0) throw new Error("range");
const collapsed = pageRange(20, 10, 1, 1);
if (!collapsed.includes("ellipsis") || !collapsed.includes(1) || !collapsed.includes(20) || !collapsed.includes(10)) {
	throw new Error(`collapsed ${collapsed.join(",")}`);
}
const nearStart = pageRange(20, 2, 1, 1);
if (!nearStart.includes(1) || nearStart.filter((t) => t === "ellipsis").size() < 1) {
	throw new Error(`nearStart ${nearStart.join(",")}`);
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["first", "middle", "disabled", "collapsed", "size-small"]) {
	if (stateMatrix.filter((row) => row.component === "Pagination" && row.name.includes(name)).length !== 2) {
		throw new Error(`Pagination missing ${name}`);
	}
}
console.log("pagination ok");
