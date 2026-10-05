Array.prototype.size = function size() { return this.length; };
String.prototype.size = function size() { return this.length; };
String.prototype.lower = function lower() { return this.toLowerCase(); };
String.prototype.find = function find(needle) {
	const i = this.indexOf(needle);
	return i >= 0 ? [i + 1] : [];
};

const { filterBrickNames, brickNameMatches } = await import(
	"../src/ui/packages/brickColorPicker/components/brickColorFilter.ts"
);
const names = ["Bright red", "Really black", "White"];
if (filterBrickNames(names, "red").join(",") !== "Bright red") throw new Error("filter");
if (!brickNameMatches("Really black", "black") || brickNameMatches("White", "red")) throw new Error("match");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "open", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "BrickColorPicker" && row.name.includes(name)).length !== 2) {
		throw new Error(`BrickColorPicker missing ${name}`);
	}
}

console.log("brickcolor picker ok");
