import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = readFileSync(join(root, "src/ui/packages/stateMatrix.ts"), "utf8");

if (src.includes("...pair(")) {
	throw new Error("stateMatrix still spreads pair() into array literals; use pushPair");
}
if (!src.includes("function pushPair")) {
	throw new Error("stateMatrix missing pushPair helper");
}

const luauPath = join(root, "out/ui/packages/stateMatrix.luau");
if (existsSync(luauPath)) {
	const luau = readFileSync(luauPath, "utf8");
	const LIMIT = 180;
	const functions = luau.split(/\n(?=local function )/);
	let worst = { name: "", count: 0 };
	for (const chunk of functions) {
		const match = chunk.match(/^local function (\w+)\(/);
		if (!match) continue;
		const name = match[1];
		const locals = (chunk.match(/\n\tlocal /g) ?? []).length;
		if (locals > worst.count) worst = { name, count: locals };
		if (locals > LIMIT) {
			throw new Error(`${name} has ${locals} locals (limit ${LIMIT})`);
		}
	}
	if (luau.includes("local _array_50")) {
		throw new Error("stateMatrix still compiles spread arrays; use pushPair");
	}
	console.log(`state-matrix registers ok (worst ${worst.name}=${worst.count})`);
} else {
	console.log("state-matrix registers ok (source)");
}
