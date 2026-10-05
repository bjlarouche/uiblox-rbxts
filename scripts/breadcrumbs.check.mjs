globalThis.math = Math;
Array.prototype.size = function size() {
	return this.length;
};

const { breadcrumbCurrent, breadcrumbVisible } = await import(
	"../src/ui/packages/breadcrumbs/components/breadcrumbItems.ts"
);
if (breadcrumbCurrent(0, 0) || breadcrumbCurrent(0, 2) || !breadcrumbCurrent(1, 2)) {
	throw new Error("current item");
}
const full = breadcrumbVisible([{ label: "A" }, { label: "B" }, { label: "C" }]);
if (full.size() !== 3) throw new Error("full");
const collapsed = breadcrumbVisible(
	[{ label: "A" }, { label: "B" }, { label: "C" }, { label: "D" }, { label: "E" }],
	3,
);
if (collapsed.size() !== 3 || collapsed[1].ellipsis !== true || collapsed[2].label !== "E") {
	throw new Error("collapsed");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["single", "trail", "collapsed", "custom-separator"]) {
	if (stateMatrix.filter((row) => row.component === "Breadcrumbs" && row.name.includes(name)).length !== 2) {
		throw new Error(`Breadcrumbs missing ${name}`);
	}
}

console.log("breadcrumbs ok");
