const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "selected", "disabled", "icons"]) {
	if (!stateMatrix.some((row) => row.component === "BottomNavigation" && row.name.includes(name))) {
		throw new Error(`BottomNavigation missing ${name}`);
	}
}

console.log("bottom-navigation ok");
