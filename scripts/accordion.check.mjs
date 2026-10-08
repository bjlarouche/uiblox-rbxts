const { accordionNote } = await import("../src/ui/packages/accordion/components/accordionNote.ts");
if (accordionNote() !== undefined || accordionNote("") !== undefined) throw new Error("empty note");
if (accordionNote("two sacks") !== "two sacks") throw new Error("note");

const { accordionGlyph, accordionOpen } = await import("../src/ui/packages/accordion/components/accordionOpen.ts");
if (accordionOpen(true, undefined) !== true) throw new Error("uncontrolled open");
if (accordionOpen(false, true) !== true) throw new Error("controlled wins");
if (accordionOpen(true, false) !== false) throw new Error("controlled closed");
if (accordionGlyph(true) !== "expanded" || accordionGlyph() !== "collapsed" || accordionGlyph(false) !== "collapsed") {
	throw new Error("accordion glyph");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "open", "disabled", "indicator", "square"]) {
	if (stateMatrix.filter((row) => row.component === "Accordion" && row.name.includes(name)).length !== 2) {
		throw new Error(`Accordion missing ${name}`);
	}
}

console.log("accordion ok");
