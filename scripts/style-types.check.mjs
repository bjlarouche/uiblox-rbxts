import { execSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
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
	include: [join(dir, "src")],
};

mkdirSync(join(dir, "src"), { recursive: true });
writeFileSync(join(dir, "tsconfig.json"), JSON.stringify(tsconfig, null, 2));

writeFileSync(
	join(dir, "src/ok.ts"),
	`
import { cx, WriteableStyle } from "theme";

const base: WriteableStyle<Frame> = { BackgroundTransparency: 1 };
const errorStyle: WriteableStyle<Frame> = { BackgroundColor3: Color3.fromRGB(255, 0, 0) };
const merged: WriteableStyle<Frame> = cx(base, true && errorStyle, false && { Size: UDim2.fromScale(1, 1) });
void merged;
`,
);

writeFileSync(
	join(dir, "src/bad-property.ts"),
	`
import { WriteableStyle } from "theme";

// Text is not a Frame property — this file must fail typecheck
const bad: WriteableStyle<Frame> = { Text: "nope" };
void bad;
`,
);

try {
	execSync(`pnpm exec tsc -p ${JSON.stringify(join(dir, "tsconfig.json"))} --pretty false`, {
		cwd: root,
		stdio: "pipe",
		encoding: "utf8",
	});
	throw new Error("expected bad-property.ts to fail typecheck");
} catch (error) {
	const output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
	if (!output.includes("bad-property.ts")) {
		throw new Error(`typecheck did not fail on bad-property.ts:\n${output}`);
	}
	if (output.includes("ok.ts")) {
		throw new Error(`ok.ts failed typecheck:\n${output}`);
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

rmSync(dir, { recursive: true, force: true });
console.log("style types ok");
