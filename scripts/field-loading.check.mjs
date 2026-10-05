const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");

for (const [component, name] of [
	["Input", "loading"],
	["Input", "loading-reduced"],
	["Select", "loading"],
	["Select", "loading-reduced"],
]) {
	if (!stateMatrix.some((row) => row.component === component && row.name.includes(name))) {
		throw new Error(`${component} missing ${name}`);
	}
}

console.log("field-loading ok");
