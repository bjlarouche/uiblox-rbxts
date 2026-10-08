const { optionLabel } = await import("../src/ui/packages/select/components/optionLabel.ts");
const { selectWidth } = await import("../src/ui/packages/select/components/selectWidth.ts");
if (selectWidth(200, 12, 96) !== 212) throw new Error("long select grows");
if (selectWidth(40, 12, 96) !== 96) throw new Error("wide select stays");
if (selectWidth(200, 12, 0) !== 212) throw new Error("unmeasured select grows");
if (optionLabel("Go", true) !== "✓ Go" || optionLabel("Go", false) !== "Go") {
	throw new Error("option label");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["hover", "focus", "open", "empty", "no-results"]) {
	if (stateMatrix.filter((row) => row.component === "Select" && row.name.includes(name)).length !== 2) {
		throw new Error(`Select missing ${name}`);
	}
}

console.log("select polish ok");
