import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";

const src = join(process.cwd(), "src");

function walk(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) walk(path, out);
		else if (name.endsWith(".ts") || name.endsWith(".tsx")) out.push(path);
	}
	return out;
}

function resolveExact(fromDir, spec) {
	const parts = spec.split("/");
	let dir = fromDir;
	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (part === "." || part === "") continue;
		if (part === "..") {
			dir = dirname(dir);
			continue;
		}
		const names = readdirSync(dir);
		const last = i === parts.length - 1;
		const fileHit = last ? ["", ".ts", ".tsx"].map((ext) => part + ext).find((name) => names.includes(name)) : undefined;
		if (fileHit && !statSync(join(dir, fileHit)).isDirectory()) return;
		if (names.includes(part)) {
			dir = join(dir, part);
			continue;
		}
		const folded = names.find((name) => name.toLowerCase() === part.toLowerCase() || name.toLowerCase() === `${part}.ts` || name.toLowerCase() === `${part}.tsx`);
		if (folded) throw new Error(`case mismatch: ${spec} resolved ${folded} in ${dir}`);
		throw new Error(`unresolved import ${spec} in ${dir}`);
	}
	if (!readdirSync(dir).includes("index.ts") && !readdirSync(dir).includes("index.tsx")) {
		throw new Error(`unresolved import ${spec} (no index) in ${dir}`);
	}
}

const importRe = /from\s+["']([^"']+)["']/g;
for (const file of walk(src)) {
	const text = readFileSync(file, "utf8");
	for (const match of text.matchAll(importRe)) {
		const spec = match[1];
		if (spec === "react" || spec.startsWith("react/")) throw new Error(`${file} imports "${spec}"`);
		if (spec.startsWith(".")) resolveExact(dirname(file), spec);
		else if (spec === "theme" || spec.startsWith("theme/") || spec === "ui" || spec.startsWith("ui/")) {
			resolveExact(src, spec);
		}
	}
}

console.log("import case ok");
