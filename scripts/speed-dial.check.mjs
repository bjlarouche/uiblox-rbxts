const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "open", "disabled"]) {
	if (!stateMatrix.some((row) => row.component === "SpeedDial" && row.name.includes(name))) {
		throw new Error(`SpeedDial missing ${name}`);
	}
}

console.log("speed-dial ok");
