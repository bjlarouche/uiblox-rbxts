const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["open", "closed"]) {
	if (stateMatrix.filter((row) => row.component === "Snackbar" && row.name.includes(name)).length !== 2) {
		throw new Error(`Snackbar missing ${name}`);
	}
}

console.log("snackbar ok");
