const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");

for (const name of ["default", "hover", "narrow", "disabled", "loading"]) {
	if (stateMatrix.filter((row) => row.component === "StyleSx" && row.name.includes(name)).length !== 2) {
		throw new Error(`StyleSx missing ${name}`);
	}
}

console.log("style system ok");
