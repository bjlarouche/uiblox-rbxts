const { accordionOpen } = await import("../src/ui/packages/accordion/components/accordionOpen.ts");
if (accordionOpen(true, undefined) !== true) throw new Error("uncontrolled open");
if (accordionOpen(false, true) !== true) throw new Error("controlled wins");
if (accordionOpen(true, false) !== false) throw new Error("controlled closed");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "open", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "Accordion" && row.name.includes(name)).length !== 2) {
		throw new Error(`Accordion missing ${name}`);
	}
}

console.log("accordion ok");
