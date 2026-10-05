const {
	stackIsRow,
	stackGap,
	stackUsesFlex,
	stackNeedsMainFill,
	stackRootAutomaticSize,
	stackAlignKey,
	stackJustifyKey,
} = await import("../src/ui/packages/layout/components/stackAlign.ts");

if (stackIsRow("row") !== true || stackIsRow() !== false) throw new Error("row");
if (stackGap() !== 1 || stackGap(2) !== 2 || stackGap(2, 3) !== 3) throw new Error("gap");
if (!stackUsesFlex("space-between") || stackUsesFlex("start")) throw new Error("flex");
if (!stackNeedsMainFill(true) || !stackNeedsMainFill(false, "space-between") || stackNeedsMainFill()) {
	throw new Error("main fill");
}
if (stackRootAutomaticSize(true, true) !== "Y" || stackRootAutomaticSize(false, true) !== "X") {
	throw new Error("auto size");
}
if (stackRootAutomaticSize(true, false) !== "XY") throw new Error("auto xy");
if (stackAlignKey("end") !== "end" || stackAlignKey("stretch") !== "stretch" || stackAlignKey() !== "start") {
	throw new Error("align");
}
if (stackJustifyKey("space-evenly") !== "space-evenly" || stackJustifyKey() !== "start") throw new Error("justify");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["column", "row", "spaced", "wrap", "justify-between", "align-stretch"]) {
	if (!stateMatrix.some((row) => row.component === "Stack" && row.name.includes(name))) {
		throw new Error(`Stack missing ${name}`);
	}
}

console.log("stack ok");
