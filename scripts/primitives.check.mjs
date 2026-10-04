import { execSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();

const { syncInputDraft } = await import(
	pathToFileURL(join(root, "src/ui/packages/input/components/inputDraft.ts")).href
);
const { canActivate } = await import(
	pathToFileURL(join(root, "src/ui/packages/button/components/activation.ts")).href
);

if (syncInputDraft(false, "next", "draft") !== "next") throw new Error("unfocused draft must follow text");
if (syncInputDraft(true, "next", "draft") !== "draft") throw new Error("focused draft must stay editable");
if (syncInputDraft(false, undefined, "draft") !== "") throw new Error("missing text clears the field");
if (canActivate(true, false)) throw new Error("disabled must not activate");
if (canActivate(false, true)) throw new Error("loading must not activate");
if (!canActivate(false, false)) throw new Error("enabled control must activate");

const { nextChecked } = await import(
	pathToFileURL(join(root, "src/ui/packages/checkbox/components/nextChecked.ts")).href
);
if (nextChecked(false) !== true) throw new Error("unchecked toggles on");
if (nextChecked(true) !== false) throw new Error("checked toggles off");
if (nextChecked(true, true) !== true) throw new Error("mixed commits checked");
if (nextChecked(false, true) !== true) throw new Error("mixed commits checked");

const { branchHoldsSelection, visibleRows } = await import(
	pathToFileURL(join(root, "src/ui/packages/treeView/components/treeRows.ts")).href
);
if (!branchHoldsSelection("Fixture", "Fixture/Styled")) throw new Error("selected leaf bolds Fixture on mount");
if (!branchHoldsSelection("Inputs", "Inputs/Button/Primary")) throw new Error("ancestor of the selection is bold");
if (!branchHoldsSelection("Inputs/Button", "Inputs/Button/Primary")) throw new Error("direct parent is bold");
if (branchHoldsSelection("Other", "Fixture/Styled")) throw new Error("unrelated branch is bold");
const mounted = visibleRows(
	[{ title: "Fixture", leaves: [{ title: "Native" }, { title: "Styled" }] }],
	[],
	"Fixture/Styled",
);
if (!mounted[0].emphasized || mounted[0].title !== "Fixture") throw new Error("first mount bolds Fixture before expand");
const nested = [
	{
		title: "Inputs",
		leaves: [],
		branches: [{ title: "Button", leaves: [{ title: "Primary" }] }],
	},
];
const rows = visibleRows(nested, ["Inputs", "Inputs/Button"], "Inputs/Button/Primary");
if (rows.length !== 3) throw new Error(`expected 3 levels, got ${rows.length}`);
if (rows[0].depth !== 0 || rows[0].title !== "Inputs" || !rows[0].emphasized) throw new Error("root branch depth");
if (rows[1].depth !== 1 || rows[1].title !== "Button" || !rows[1].emphasized) throw new Error("middle branch");
if (rows[2].depth !== 2 || rows[2].path !== "Inputs/Button/Primary" || !rows[2].emphasized) {
	throw new Error("leaf level");
}
const flat = visibleRows([{ title: "Fixture", leaves: [{ title: "Native" }] }], ["Fixture"], "Fixture/Native");
if (!flat[0].emphasized || flat[1].path !== "Fixture/Native" || flat[1].icon !== undefined) {
	throw new Error("two-level selection");
}

const dir = mkdtempSync(join(tmpdir(), "uiblox-primitives-"));
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
			ui: [join(root, "src/ui")],
			"ui/*": [join(root, "src/ui/*")],
		},
		noEmit: true,
		skipLibCheck: true,
	},
};
mkdirSync(join(dir, "src"), { recursive: true });
writeFileSync(
	join(dir, "src/ok.ts"),
	`
import { ButtonProps } from "ui/packages/button";
import { CheckboxProps } from "ui/packages/checkbox";
import { IconButtonProps } from "ui/packages/iconButton";
import { InputProps } from "ui/packages/input";
import { SwitchProps } from "ui/packages/switch";
import { Branch } from "ui/packages/treeView";
import { Icons } from "ui/enums";

const button: ButtonProps = { text: "Save", disabled: false, loading: false };
const icon: IconButtonProps = { icon: Icons.Save, tint: new Color3(1, 1, 1), disabled: true };
const input: InputProps = { text: "draft", disabled: true, onTextChanged: () => {} };
const checkbox: CheckboxProps = { value: false, mixed: true, disabled: true, onChange: () => {} };
const toggle: SwitchProps = { value: true, disabled: false, onChange: () => {} };
const nestedBranch: Branch = {
	title: "Inputs",
	icon: Icons.Book,
	leaves: [{ title: "Primary", icon: Icons.Book }],
	branches: [{ title: "Button", leaves: [] }],
};
void button;
void icon;
void input;
void checkbox;
void toggle;
void nestedBranch;
`,
);
writeFileSync(
	join(dir, "src/bad.ts"),
	`
import { ButtonProps } from "ui/packages/button";
const bad: ButtonProps = { disabled: "no" };
void bad;
`,
);
const config = (file) => {
	const path = join(dir, `${file}.json`);
	writeFileSync(path, JSON.stringify({ ...tsconfig, include: [join(dir, "src", file)] }, null, 2));
	return path;
};
execSync(`pnpm exec tsc -p ${JSON.stringify(config("ok.ts"))} --pretty false`, { cwd: root, stdio: "inherit" });
try {
	execSync(`pnpm exec tsc -p ${JSON.stringify(config("bad.ts"))} --pretty false`, {
		cwd: root,
		stdio: "pipe",
		encoding: "utf8",
	});
	throw new Error("expected bad.ts to fail typecheck");
} catch (error) {
	if (error.message === "expected bad.ts to fail typecheck") throw error;
	const output = `${error.stdout ?? ""}${error.stderr ?? ""}`;
	if (!output.includes("bad.ts")) throw new Error(`typecheck did not fail on bad.ts:\n${output}`);
}
rmSync(dir, { recursive: true, force: true });
console.log("primitives ok");
