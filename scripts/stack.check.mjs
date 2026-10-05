const { stackIsRow, stackGap, stackUsesFlex, stackAlignKey, stackJustifyKey } = await import(
	"../src/ui/packages/layout/components/stackAlign.ts"
);

if (stackIsRow("row") !== true || stackIsRow() !== false) throw new Error("row");
if (stackGap() !== 1 || stackGap(2) !== 2) throw new Error("gap");
if (!stackUsesFlex("space-between") || stackUsesFlex("start")) throw new Error("flex");
if (stackAlignKey("end") !== "end" || stackAlignKey() !== "start") throw new Error("align");
if (stackJustifyKey("space-evenly") !== "space-evenly" || stackJustifyKey() !== "start") throw new Error("justify");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["column", "row", "spaced"]) {
	if (!stateMatrix.some((row) => row.component === "Stack" && row.name.includes(name))) {
		throw new Error(`Stack missing ${name}`);
	}
}

console.log("stack ok");
