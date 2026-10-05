const { autocompleteSearchable } = await import("../src/ui/packages/autocomplete/components/autocompleteSearchable.ts");
if (autocompleteSearchable() !== true || autocompleteSearchable(true) !== true || autocompleteSearchable(false) !== false) {
	throw new Error("searchable default");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "open", "disabled", "empty", "no-results"]) {
	if (stateMatrix.filter((row) => row.component === "Autocomplete" && row.name.includes(name)).length !== 2) {
		throw new Error(`Autocomplete missing ${name}`);
	}
}

console.log("autocomplete ok");
