import { readFileSync } from "node:fs";

String.prototype.size = function size() {
	return this.length;
};
String.prototype.sub = function sub(start, finish) {
	return this.slice(start - 1, finish);
};
String.prototype.upper = function upper() {
	return this.toUpperCase();
};

const avatar = readFileSync("src/ui/packages/avatar/components/Avatar.styles.ts", "utf8");
if (!avatar.includes("TextXAlignment.Center") || !avatar.includes("TextYAlignment.Center")) {
	throw new Error("avatar fallback should stay centered");
}

const bar = readFileSync("src/ui/packages/progressBar/components/ProgressBar.styles.ts", "utf8");
if (!bar.includes("ClipsDescendants: true") || !bar.includes("surface.input")) {
	throw new Error("progress fill should stay on the track");
}
const ring = readFileSync("src/ui/packages/circularProgress/components/CircularProgress.tsx", "utf8");
if (!ring.includes('key="Track"')) throw new Error("progress ring needs its own track");
const skeleton = readFileSync("src/ui/packages/skeleton/components/Skeleton.tsx", "utf8");
if (!skeleton.includes("AutomaticSize.None") || !skeleton.includes("ClipsDescendants={true}")) {
	throw new Error("skeleton should keep its box");
}

const { avatarInitials } = await import("../src/ui/packages/avatar/components/avatarText.ts");
if (avatarInitials("Brandon Larouche") !== "BL") throw new Error("two words");
if (avatarInitials("  storyblox  ") !== "S") throw new Error("spacing");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["initials", "image", "small", "rounded"]) {
	if (stateMatrix.filter((row) => row.component === "Avatar" && row.name.includes(name)).length !== 2) {
		throw new Error(`Avatar missing ${name}`);
	}
}

console.log("avatar ok");
