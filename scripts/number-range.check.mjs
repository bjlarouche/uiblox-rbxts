const { writeNumberRange } = await import("../src/ui/packages/numberRangeEditor/components/numberRangeValue.ts");
const min = writeNumberRange(1, 5, "Min", 2);
const max = writeNumberRange(1, 5, "Max", 9);
if (min.Min !== 2 || min.Max !== 5 || max.Min !== 1 || max.Max !== 9) throw new Error("range");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "NumberRangeEditor" && row.name.includes(name)).length !== 2) {
		throw new Error(`NumberRangeEditor missing ${name}`);
	}
}

console.log("number range ok");
