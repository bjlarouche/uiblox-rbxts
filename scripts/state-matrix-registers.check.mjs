import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const luauPath = join(root, "out/ui/packages/stateMatrix.luau");
let luau;
try {
	luau = readFileSync(luauPath, "utf8");
} catch {
	throw new Error("missing out/ui/packages/stateMatrix.luau — run pnpm build first");
}

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
