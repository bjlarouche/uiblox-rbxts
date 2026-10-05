const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "flat", "raised"]) {
	if (!stateMatrix.some((row) => row.component === "AppBar" && row.name.includes(name))) {
		throw new Error(`AppBar missing ${name}`);
	}
}

console.log("appbar ok");
