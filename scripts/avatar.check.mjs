String.prototype.size = function size() {
	return this.length;
};
String.prototype.sub = function sub(start, finish) {
	return this.slice(start - 1, finish);
};
String.prototype.upper = function upper() {
	return this.toUpperCase();
};

const { avatarInitials } = await import("../src/ui/packages/avatar/components/avatarText.ts");
if (avatarInitials("Brandon Larouche") !== "BL") throw new Error("two words");
if (avatarInitials("  storyblox  ") !== "S") throw new Error("spacing");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["initials", "image", "small"]) {
	if (stateMatrix.filter((row) => row.component === "Avatar" && row.name.includes(name)).length !== 2) {
		throw new Error(`Avatar missing ${name}`);
	}
}

console.log("avatar ok");
