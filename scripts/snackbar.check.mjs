String.prototype.size = function size() {
	return this.length;
};

const { snackbarActionLabel } = await import("../src/ui/packages/snackbar/components/snackbarAction.ts");
if (snackbarActionLabel(undefined) !== undefined) throw new Error("missing action");
if (snackbarActionLabel("") !== undefined) throw new Error("empty action");
if (snackbarActionLabel("Undo") !== "Undo") throw new Error("action");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["open", "closed", "action"]) {
	if (stateMatrix.filter((row) => row.component === "Snackbar" && row.name.includes(name)).length !== 2) {
		throw new Error(`Snackbar missing ${name}`);
	}
}

console.log("snackbar ok");
