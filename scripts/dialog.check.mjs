const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
const { dialogWidth, dialogActionWrap, dialogTitleWrap, DIALOG_FILL_MAX } = await import("../src/ui/packages/dialog/components/dialogWidth.ts");
if (dialogWidth(undefined, 320, 144) !== 144 || dialogWidth(false, 1100, 144) !== 144) throw new Error("fixed dialog");
if (dialogWidth(true, 0, 144) !== 144) throw new Error("unmeasured dialog");
if (dialogWidth(true, 320, 144) !== 320 || dialogWidth(true, 304, 144) !== 304) throw new Error("phone dialog");
if (dialogWidth(true, 1100, 144) !== DIALOG_FILL_MAX) throw new Error("desktop dialog");
if (dialogActionWrap(144, 96, 2, 8) !== true) throw new Error("fixed actions overflow");
if (dialogActionWrap(144, 96, 1, 8) !== false) throw new Error("one action stays");
if (dialogActionWrap(480, 96, 2, 8) !== false) throw new Error("wide actions fit");
if (dialogTitleWrap(200, 144) !== true) throw new Error("long title wraps");
if (dialogTitleWrap(100, 144) !== false) throw new Error("short title stays");
if (dialogTitleWrap(200, 0) !== false) throw new Error("unmeasured title");
for (const name of ["closed", "open"]) {
	if (!stateMatrix.some((row) => row.component === "Dialog" && row.name.includes(name))) {
		throw new Error(`Dialog missing ${name}`);
	}
}

console.log("dialog ok");
