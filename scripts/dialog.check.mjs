const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "open"]) {
	if (!stateMatrix.some((row) => row.component === "Dialog" && row.name.includes(name))) {
		throw new Error(`Dialog missing ${name}`);
	}
}

console.log("dialog ok");
