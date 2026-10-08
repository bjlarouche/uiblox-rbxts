const { radioHint } = await import("../src/ui/packages/radioGroup/components/radioHint.ts");
if (radioHint() !== undefined || radioHint("") !== undefined) throw new Error("empty hint");
if (radioHint("gate only") !== "gate only") throw new Error("hint");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "row", "disabled"]) {
	if (!stateMatrix.some((row) => row.component === "RadioGroup" && row.name.includes(name))) {
		throw new Error(`RadioGroup missing ${name}`);
	}
}

console.log("radio-group ok");
