const { speedDialLabel, speedDialLabelFirst } = await import("../src/ui/packages/speedDial/components/speedDialLabel.ts");
if (speedDialLabel() !== undefined || speedDialLabel("") !== undefined) throw new Error("empty dial label");
if (speedDialLabel("Lamp") !== "Lamp") throw new Error("dial label");
if (speedDialLabelFirst("up") !== true || speedDialLabelFirst("down") !== true || speedDialLabelFirst("right") !== true) {
	throw new Error("label side");
}
if (speedDialLabelFirst("left") !== false) throw new Error("left label side");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "open", "disabled", "down"]) {
	if (!stateMatrix.some((row) => row.component === "SpeedDial" && row.name.includes(name))) {
		throw new Error(`SpeedDial missing ${name}`);
	}
}

console.log("speed-dial ok");
