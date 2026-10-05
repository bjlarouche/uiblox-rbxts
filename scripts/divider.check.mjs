String.prototype.size = function size() {
	return this.length;
};

const { dividerLabel } = await import("../src/ui/packages/divider/components/dividerLabel.ts");
if (dividerLabel(undefined) !== undefined) throw new Error("missing label");
if (dividerLabel("") !== undefined) throw new Error("empty label");
if (dividerLabel("Or") !== "Or") throw new Error("label");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["horizontal", "vertical", "label"]) {
	if (!stateMatrix.some((row) => row.component === "Divider" && row.name.includes(name))) {
		throw new Error(`Divider missing ${name}`);
	}
}

console.log("divider ok");
