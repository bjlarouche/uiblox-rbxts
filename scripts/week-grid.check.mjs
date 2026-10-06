const { weekCellScales, weekColumnCount } = await import("../src/ui/packages/weekGrid/components/weekColumns.ts");

if (weekColumnCount(7) !== 7 || weekColumnCount(7, false) !== 7) throw new Error("week columns");
if (weekColumnCount(7, true) !== 1 || weekColumnCount(0, true) !== 1) throw new Error("narrow columns");
if (weekColumnCount(0) !== 1) throw new Error("empty columns");

function fits(count, narrow) {
	const scales = weekCellScales(count, narrow);
	const sum = scales.name + scales.day * scales.count;
	if (scales.count !== weekColumnCount(count, narrow)) throw new Error("scale count");
	if (Math.abs(sum - 1) > 1e-9) throw new Error("row overflow");
}

fits(7);
fits(7, true);
fits(1);
if (weekCellScales(7, true).count !== 1) throw new Error("narrow layout");

console.log("week grid ok");
