const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "hover-underline", "disabled", "error"]) {
	if (!stateMatrix.some((row) => row.component === "Link" && row.name.includes(name))) {
		throw new Error(`Link missing ${name}`);
	}
}

console.log("link ok");
