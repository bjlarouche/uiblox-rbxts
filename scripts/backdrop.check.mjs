const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "invisible", "closed"]) {
	if (!stateMatrix.some((row) => row.component === "Backdrop" && row.name.includes(name))) {
		throw new Error(`Backdrop missing ${name}`);
	}
}

console.log("backdrop ok");
