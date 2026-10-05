const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "filled", "disabled"]) {
	if (!stateMatrix.some((row) => row.component === "Rating" && row.name.includes(name))) {
		throw new Error(`Rating missing ${name}`);
	}
}

console.log("rating ok");
