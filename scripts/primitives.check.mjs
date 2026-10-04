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
import { Icons } from "ui/enums";

const button: ButtonProps = { text: "Save", disabled: false, loading: false };
const icon: IconButtonProps = { icon: Icons.Save, tint: new Color3(1, 1, 1), disabled: true };
const input: InputProps = { text: "draft", disabled: true, onTextChanged: () => {} };
const checkbox: CheckboxProps = { value: false, mixed: true, disabled: true, onChange: () => {} };
const toggle: SwitchProps = { value: true, disabled: false, onChange: () => {} };
void button;
void icon;
void input;
void checkbox;
void toggle;
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
