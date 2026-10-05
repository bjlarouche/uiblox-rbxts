const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "row", "disabled"]) {
	if (!stateMatrix.some((row) => row.component === "RadioGroup" && row.name.includes(name))) {
		throw new Error(`RadioGroup missing ${name}`);
	}
}

console.log("radio-group ok");
