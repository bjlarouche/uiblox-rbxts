const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const [component, name] of [
	["ToggleButton", "default"],
	["ToggleButton", "selected"],
	["ToggleButton", "disabled"],
	["ToggleButton", "size-small"],
	["ToggleButtonGroup", "default"],
	["ToggleButtonGroup", "selected"],
]) {
	if (!stateMatrix.some((row) => row.component === component && row.name.includes(name))) {
		throw new Error(`${component} missing ${name}`);
	}
}

console.log("toggle-button ok");
