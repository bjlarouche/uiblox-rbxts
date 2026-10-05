const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const [component, name] of [
	["FormLabel", "default"],
	["FormLabel", "required"],
	["FormLabel", "error"],
	["FormHelperText", "default"],
	["FormHelperText", "error"],
]) {
	if (!stateMatrix.some((row) => row.component === component && row.name.includes(name))) {
		throw new Error(`${component} missing ${name}`);
	}
}

console.log("form-text ok");
