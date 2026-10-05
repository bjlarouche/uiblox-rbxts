const { patchRotation, patchEnabled } = await import("../src/ui/packages/gradientEditor/components/gradientPatch.ts");
if (patchRotation(10, true, 45).rotation !== 45) throw new Error("rotation");
if (patchEnabled(10, true, false).enabled !== false) throw new Error("enabled");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "GradientEditor" && row.name.includes(name)).length !== 2) {
		throw new Error(`GradientEditor missing ${name}`);
	}
}

console.log("gradient editor ok");
