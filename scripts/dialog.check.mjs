const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
const { dialogWidth, DIALOG_FILL_MAX } = await import("../src/ui/packages/dialog/components/dialogWidth.ts");
if (dialogWidth(undefined, 320, 144) !== 144 || dialogWidth(false, 1100, 144) !== 144) throw new Error("fixed dialog");
if (dialogWidth(true, 0, 144) !== 144) throw new Error("unmeasured dialog");
if (dialogWidth(true, 320, 144) !== 320 || dialogWidth(true, 304, 144) !== 304) throw new Error("phone dialog");
if (dialogWidth(true, 1100, 144) !== DIALOG_FILL_MAX) throw new Error("desktop dialog");
for (const name of ["closed", "open"]) {
	if (!stateMatrix.some((row) => row.component === "Dialog" && row.name.includes(name))) {
		throw new Error(`Dialog missing ${name}`);
	}
}

console.log("dialog ok");
