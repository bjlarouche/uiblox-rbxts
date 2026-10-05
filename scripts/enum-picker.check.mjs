const { enumOptions, enumItemByName } = await import("../src/ui/packages/enumPicker/components/enumOptions.ts");
const items = [{ Name: "One" }, { Name: "Two" }];
const options = enumOptions(items);
if (options.length !== 2 || options[0].label !== "One" || options[0].value !== items[0]) {
	throw new Error("options");
}
if (enumItemByName(items, "Two") !== items[1] || enumItemByName(items, "Nope") !== undefined) {
	throw new Error("by name");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled", "open"]) {
	if (stateMatrix.filter((row) => row.component === "EnumPicker" && row.name.includes(name)).length !== 2) {
		throw new Error(`EnumPicker missing ${name}`);
	}
}

console.log("enum picker ok");
