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

globalThis.math = { floor: Math.floor, huge: Infinity, min: Math.min, max: Math.max };
globalThis.tonumber = (text) => (text.trim() === "" || Number.isNaN(Number(text)) ? undefined : Number(text));
const { commitNumber, parseNumberDraft } = await import(
	pathToFileURL(join(root, "src/ui/packages/numberInput/components/numberValue.ts")).href
);
for (const draft of ["", "-", ".", "-.", "1e", "abc"]) {
	if (parseNumberDraft(draft) !== undefined) throw new Error(`draft "${draft}" must not commit`);
}
if (parseNumberDraft("-2.5") !== -2.5) throw new Error("negative decimal commits");
if (parseNumberDraft("15", 0, 10) !== 10) throw new Error("clamps to max");
if (parseNumberDraft("-3", 0, 10) !== 0) throw new Error("clamps to min");
if (parseNumberDraft("7", 0, 10, 5) !== 5) throw new Error("rounds to step");
if (parseNumberDraft("8", 0, 10, 5) !== 10) throw new Error("rounds up to step");
if (parseNumberDraft("6", 1, 11, 5) !== 6) throw new Error("step anchors at min");
if (commitNumber(Number.NaN) !== undefined) throw new Error("NaN never commits");
if (commitNumber(Infinity) !== undefined) throw new Error("inf never commits");

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
const filtered = visibleRows(
	[
		...nested,
		{ title: "Other", leaves: [{ title: "Thing" }] },
	],
	["Inputs", "Inputs/Button"],
	undefined,
	undefined,
	(title) => title.toLowerCase().startsWith("pri"),
);
if (filtered.map((row) => row.path).join(",") !== "Inputs,Inputs/Button,Inputs/Button/Primary") {
	throw new Error("filter keeps matching ancestors and drops unrelated branches");
}
const flat = visibleRows([{ title: "Fixture", leaves: [{ title: "Native" }] }], ["Fixture"], "Fixture/Native");
if (!flat[0].emphasized || flat[1].path !== "Fixture/Native" || flat[1].icon !== undefined) {
	throw new Error("two-level selection");
}

const { stepChoice } = await import(
	pathToFileURL(join(root, "src/ui/packages/select/components/stepChoice.ts")).href
);
const choices = [{ disabled: true }, {}, { disabled: true }, {}, { disabled: true }];
if (stepChoice(choices, -1, 1) !== 1) throw new Error("opens on first enabled choice");
if (stepChoice(choices, 1, 1) !== 3) throw new Error("down skips disabled");
if (stepChoice(choices, 3, -1) !== 1) throw new Error("up skips disabled");
if (stepChoice(choices, 3, 1) !== 3) throw new Error("down stops at last enabled");
if (stepChoice(choices, 1, -1) !== 1) throw new Error("up stops at first enabled");
if (stepChoice([{ disabled: true }], -1, 1) !== -1) throw new Error("all disabled has no highlight");

const { clampSplit } = await import(
	pathToFileURL(join(root, "src/ui/packages/splitPane/components/splitSize.ts")).href
);
if (clampSplit(240, 1000, 200, 340) !== 240) throw new Error("in-bounds size is kept");
if (clampSplit(100, 1000, 200, 340) !== 200) throw new Error("clamps to min");
if (clampSplit(900, 1000, 200, 340) !== 340) throw new Error("clamps to max");
if (clampSplit(900, 1000, 200) !== 800) throw new Error("second pane keeps min");
if (clampSplit(300, 300, 200, 340) !== 200) throw new Error("short dock favors first pane min");
if (clampSplit(50, 0) !== 0) throw new Error("unmeasured pane collapses");

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
import { NumberInputProps } from "ui/packages/numberInput";
import { SliderProps } from "ui/packages/slider";
import { RadioGroupProps } from "ui/packages/radioGroup";
import { SelectProps } from "ui/packages/select";
import { TabsProps } from "ui/packages/tabs";
import { SplitPaneProps } from "ui/packages/splitPane";
import { Branch } from "ui/packages/treeView";
import { Icons } from "ui/enums";

const button: ButtonProps = { text: "Save", disabled: false, loading: false };
const icon: IconButtonProps = { icon: Icons.Save, tint: new Color3(1, 1, 1), disabled: true };
const input: InputProps = { text: "draft", disabled: true, onTextChanged: () => {}, onInput: () => {} };
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
const numberInput: NumberInputProps = { value: 1, min: 0, max: 10, step: 1, onChange: () => {} };
const slider: SliderProps = { value: 0.5, min: 0, max: 1, onChange: () => {}, onCommit: () => {} };
void numberInput;
void slider;
const radio: RadioGroupProps<Enum.Font> = {
	value: Enum.Font.SourceSans,
	options: [
		{ label: "Regular", value: Enum.Font.SourceSans },
		{ label: "Bold", value: Enum.Font.SourceSansBold, disabled: true },
	],
	onChange: (font: Enum.Font) => void font,
};
void radio;
const select: SelectProps<Enum.Font> = { ...radio, placeholder: "Font", disabled: false };
void select;
const tabs: TabsProps<string> = {
	value: "controls",
	options: [
		{ label: "Controls", value: "controls" },
		{ label: "Docs", value: "docs", disabled: true },
	],
	onChange: (tab: string) => void tab,
};
void tabs;
const split: SplitPaneProps = { value: 240, min: 200, max: 340, vertical: false, onChange: (size: number) => void size };
void split;
`,
);
writeFileSync(
	join(dir, "src/bad.ts"),
	`
import { ButtonProps } from "ui/packages/button";
import { RadioGroupProps } from "ui/packages/radioGroup";
const bad: ButtonProps = { disabled: "no" };
const badRadio: RadioGroupProps<number> = { value: 1, options: [{ label: "One", value: "1" }], onChange: () => {} };
void bad;
void badRadio;
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
	if (!output.includes("bad.ts(5,")) throw new Error(`radio value type mismatch was accepted:\n${output}`);
}
rmSync(dir, { recursive: true, force: true });
console.log("primitives ok");
