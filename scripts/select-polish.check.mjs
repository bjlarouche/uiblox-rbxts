const { optionLabel } = await import("../src/ui/packages/select/components/optionLabel.ts");
if (optionLabel("Go", true) !== "✓ Go" || optionLabel("Go", false) !== "Go") {
	throw new Error("option label");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["hover", "focus", "open"]) {
	if (stateMatrix.filter((row) => row.component === "Select" && row.name.includes(name)).length !== 2) {
		throw new Error(`Select missing ${name}`);
	}
}

console.log("select polish ok");
