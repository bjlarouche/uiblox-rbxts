const { fabPixels, fabIconPixels, fabExtended } = await import("../src/ui/packages/fab/components/fabSize.ts");
if (fabPixels("small") !== 40 || fabPixels() !== 56 || fabPixels("large") !== 64) {
	throw new Error("fab pixels");
}
if (fabIconPixels("small") !== 18 || fabIconPixels() !== 24 || fabIconPixels("large") !== 28) {
	throw new Error("fab icon pixels");
}
if (fabExtended() !== false || fabExtended("") !== false || fabExtended("Compose") !== true) {
	throw new Error("fab extended");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "extended", "small", "large", "disabled", "loading", "accent"]) {
	if (!stateMatrix.some((row) => row.component === "Fab" && row.name.includes(name))) {
		throw new Error(`Fab missing ${name}`);
	}
}

console.log("fab ok");
