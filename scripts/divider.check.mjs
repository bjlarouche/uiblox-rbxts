const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["horizontal", "vertical"]) {
	if (!stateMatrix.some((row) => row.component === "Divider" && row.name.includes(name))) {
		throw new Error(`Divider missing ${name}`);
	}
}

console.log("divider ok");
