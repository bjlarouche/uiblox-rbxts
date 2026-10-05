const { flexItemMode, flexItemGrowRatio, flexItemShrinkRatio, flexItemAlignKey } = await import(
	"../src/ui/packages/layout/components/flexItemMode.ts"
);

if (flexItemMode() !== "none") throw new Error("none");
if (flexItemMode(1) !== "grow" || flexItemMode(undefined, 1) !== "shrink") throw new Error("grow/shrink");
if (flexItemMode(1, 1) !== "custom" || flexItemMode(0, 0, true) !== "fill") throw new Error("custom/fill");
if (flexItemGrowRatio(2) !== 2 || flexItemGrowRatio() !== 0) throw new Error("grow ratio");
if (flexItemShrinkRatio(3) !== 3 || flexItemShrinkRatio() !== 0) throw new Error("shrink ratio");
if (flexItemAlignKey("stretch") !== "stretch" || flexItemAlignKey() !== "auto") throw new Error("align");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["grow", "shrink", "fill"]) {
	if (!stateMatrix.some((row) => row.component === "FlexItem" && row.name.includes(name))) {
		throw new Error(`FlexItem missing ${name}`);
	}
}

console.log("flex-item ok");
