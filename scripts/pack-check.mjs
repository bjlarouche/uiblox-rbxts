import { execSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const lock = readFileSync(join(root, "pnpm-lock.yaml"), "utf8");
if (/artifactory/.test(lock) || /https:\/\/(?!registry\.npmjs\.org|eslint\.org)/.test(lock)) {
	throw new Error("pnpm-lock.yaml is not registry.npmjs.org");
}
execSync("pnpm build", { stdio: "inherit", cwd: root });

const dir = mkdtempSync(join(tmpdir(), "uiblox-pack-"));
try {
	execSync(`pnpm pack --pack-destination ${dir}`, { stdio: "inherit", cwd: root });
	const tgzName = readdirSync(dir).find((name) => name.endsWith(".tgz"));
	if (!tgzName) throw new Error("pnpm pack produced no tarball");
	const tgz = join(dir, tgzName);
	const files = execSync(`tar -tzf ${JSON.stringify(tgz)}`, { encoding: "utf8" })
		.split("\n")
		.filter(Boolean);
	if (files.some((file) => file.endsWith("tsbuildinfo"))) throw new Error("tarball includes tsbuildinfo");
	if (!files.includes("package/out/init.luau")) throw new Error("tarball missing out/init.luau");
	if (files.includes("package/out/init.lua")) throw new Error("tarball includes out/init.lua");

	const consumer = join(dir, "consumer");
	mkdirSync(join(consumer, "src"), { recursive: true });
	writeFileSync(
		join(consumer, "package.json"),
		JSON.stringify(
			{
				name: "@rbxts/uiblox-pack-consumer",
				private: true,
				dependencies: { "@rbxts/uiblox": `file:${tgz}` },
				devDependencies: {
					"@rbxts/compiler-types": "^3.0.0-types.0",
					"@rbxts/types": "^1.0.813",
					"roblox-ts": "^3.0.0",
					typescript: "^5.6.3",
				},
			},
			null,
			2,
		),
	);
	writeFileSync(
		join(consumer, "tsconfig.json"),
		JSON.stringify(
			{
				compilerOptions: {
					allowSyntheticDefaultImports: true,
					downlevelIteration: true,
					jsx: "react",
					jsxFactory: "React.createElement",
					jsxFragmentFactory: "React.Fragment",
					module: "commonjs",
					moduleResolution: "Node",
					moduleDetection: "force",
					noLib: true,
					strict: true,
					target: "ESNext",
					typeRoots: ["node_modules/@rbxts"],
					rootDir: "src",
					outDir: "out",
				},
			},
			null,
			2,
		),
	);
	writeFileSync(
		join(consumer, "src/index.ts"),
		`import { LightTheme, ThemeProvider } from "@rbxts/uiblox";\nexport const theme = LightTheme;\nexport const Provider = ThemeProvider;\n`,
	);
	execSync("pnpm install", { stdio: "inherit", cwd: consumer });
	execSync("pnpm exec rbxtsc", { stdio: "inherit", cwd: consumer });
	console.log(`pack:check ok ${tgzName}`);
} finally {
	rmSync(dir, { recursive: true, force: true });
}
