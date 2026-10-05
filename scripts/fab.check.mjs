const { fabPixels, fabIconPixels } = await import("../src/ui/packages/fab/components/fabSize.ts");
if (fabPixels("small") !== 40 || fabPixels() !== 56 || fabPixels("large") !== 64) {
	throw new Error("fab pixels");
}
if (fabIconPixels("small") !== 18 || fabIconPixels() !== 24 || fabIconPixels("large") !== 28) {
	throw new Error("fab icon pixels");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "small", "large", "disabled", "loading"]) {
	if (!stateMatrix.some((row) => row.component === "Fab" && row.name.includes(name))) {
		throw new Error(`Fab missing ${name}`);
	}
}

console.log("fab ok");
