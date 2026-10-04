import { execSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

const { default: classNames, cx } = await import(
	pathToFileURL(join(root, "src/theme/styles/utilities/classNames.ts")).href
);
if (cx !== classNames) throw new Error("cx must equal classNames");

const left = { BackgroundTransparency: 0, BackgroundColor3: "red" };
const right = { BackgroundTransparency: 1 };
const leftCopy = { ...left };
const merged = cx(left, false, undefined, right);
if (merged.BackgroundTransparency !== 1) throw new Error("later arg must win");
if (merged.BackgroundColor3 !== "red") throw new Error("unrelated keys must survive");
if (left.BackgroundTransparency !== leftCopy.BackgroundTransparency) throw new Error("cx mutated left");
if (right.BackgroundTransparency !== 1) throw new Error("cx mutated right");
if (Object.keys(cx(false, undefined)).length !== 0) throw new Error("falsy-only merge must be empty");

const dir = mkdtempSync(join(tmpdir(), "uiblox-style-types-"));

const tsconfig = {
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
		typeRoots: [join(root, "node_modules/@rbxts")],
		baseUrl: join(root, "src"),
		paths: {
			theme: [join(root, "src/theme")],
			"theme/*": [join(root, "src/theme/*")],
		},
		noEmit: true,
		skipLibCheck: true,
	},
};

mkdirSync(join(dir, "src"), { recursive: true });

writeFileSync(
	join(dir, "src/ok.ts"),
	`
import { createStyles, cx, WriteableStyle } from "theme";

const base: WriteableStyle<Frame> = { BackgroundTransparency: 1 };
const errorStyle: WriteableStyle<Frame> = { BackgroundColor3: Color3.fromRGB(255, 0, 0) };
const merged: WriteableStyle<Frame> = cx(base, true && errorStyle, false && { Size: UDim2.fromScale(1, 1) });
void merged;

const slots = createStyles({
	root: { BackgroundTransparency: 1 } as WriteableStyle<Frame>,
	label: { Text: "ok" } as WriteableStyle<TextLabel>,
});
const rootOnly: WriteableStyle<Frame> = slots.root;
const labelOnly: WriteableStyle<TextLabel> = slots.label;
void rootOnly;
void labelOnly;
`,
);

writeFileSync(
	join(dir, "src/bad-property.ts"),
	`
import { WriteableStyle } from "theme";

const bad: WriteableStyle<Frame> = { Text: "nope" };
void bad;
`,
);

writeFileSync(
	join(dir, "src/bad-slot.ts"),
	`
import { createStyles } from "theme";

const slots = createStyles({
	root: { BackgroundTransparency: 1 },
});
const bad = slots.missing;
void bad;
`,
);

function expectFail(configName, fileName) {
	const configPath = join(dir, configName);
	writeFileSync(configPath, JSON.stringify({ ...tsconfig, include: [join(dir, "src", fileName)] }, null, 2));
	try {
		execSync(`pnpm exec tsc -p ${JSON.stringify(configPath)} --pretty false`, {
			cwd: root,
			stdio: "pipe",
			encoding: "utf8",
		});
		throw new Error(`expected ${fileName} to fail typecheck`);
	} catch (error) {
		if (error.message === `expected ${fileName} to fail typecheck`) throw error;
		const output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
		if (!output.includes(fileName)) {
			throw new Error(`typecheck did not fail on ${fileName}:\n${output}`);
		}
	}
}

writeFileSync(
	join(dir, "tsconfig.ok.json"),
	JSON.stringify({ ...tsconfig, include: [join(dir, "src/ok.ts")] }, null, 2),
);
execSync(`pnpm exec tsc -p ${JSON.stringify(join(dir, "tsconfig.ok.json"))} --pretty false`, {
	cwd: root,
	stdio: "inherit",
});

expectFail("tsconfig.bad-property.json", "bad-property.ts");
expectFail("tsconfig.bad-slot.json", "bad-slot.ts");

rmSync(dir, { recursive: true, force: true });
console.log("style types ok");