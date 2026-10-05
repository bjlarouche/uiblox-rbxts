Array.prototype.size = function size() {
	return this.length;
};
String.prototype.size = function size() {
	return this.length;
};

const { includesChoice, selectionLabel } = await import("../src/ui/packages/select/components/selectMulti.ts");

const options = [
	{ label: "Red", value: "r" },
	{ label: "Green", value: "g" },
	{ label: "Blue", value: "b" },
];

if (includesChoice(undefined, "r")) throw new Error("single");
if (!includesChoice(["r", "b"], "b") || includesChoice(["r"], "g")) throw new Error("membership");
if (selectionLabel(options, ["b", "r"], "Pick") !== "Red, Blue") throw new Error("label order");
if (selectionLabel(options, [], "Pick") !== "Pick") throw new Error("empty");

console.log("select multi ok");
