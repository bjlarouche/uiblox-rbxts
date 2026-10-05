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

const { inputInsets } = await import(
	pathToFileURL(join(root, "src/ui/packages/input/components/inputInsets.ts")).href
);
if (inputInsets(false, false, 12, 4).left !== 4 || inputInsets(false, false, 12, 4).right !== 4) {
	throw new Error("empty adornments keep gap only");
}
if (inputInsets(true, false, 12, 4).left !== 16) throw new Error("start adornment adds icon width");
if (inputInsets(false, true, 12, 4).right !== 16) throw new Error("end adornment adds icon width");
if (inputInsets(true, true, 12, 4).left !== 16 || inputInsets(true, true, 12, 4).right !== 16) {
	throw new Error("both adornments inset both sides");
}
if (canActivate(true, false)) throw new Error("disabled must not activate");
if (canActivate(false, true)) throw new Error("loading must not activate");
if (!canActivate(false, false)) throw new Error("enabled control must activate");

globalThis.math = {
	floor: Math.floor,
	huge: Infinity,
	min: Math.min,
	max: Math.max,
	clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
	abs: Math.abs,
};
globalThis.tonumber = (text, radix) => {
	if (typeof text !== "string" || text.trim() === "") return undefined;
	const value = radix === undefined ? Number(text) : Number.parseInt(text, radix);
	return Number.isNaN(value) ? undefined : value;
};
globalThis.string = {
	format: (fmt, ...args) => {
		let index = 0;
		return fmt.replace(/%0(\d+)X/g, (_, width) => args[index++].toString(16).toUpperCase().padStart(Number(width), "0"));
	},
};
String.prototype.size = function size() {
	return this.length;
};
String.prototype.sub = function sub(from, to) {
	return this.substring(from - 1, to);
};
globalThis.Color3 = class Color3 {
	constructor(r = 0, g = 0, b = 0) {
		this.R = r;
		this.G = g;
		this.B = b;
	}
};
globalThis.Vector2 = class Vector2 {
	constructor(x = 0, y = 0) {
		this.X = x;
		this.Y = y;
	}
};
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

const {
	byteToUnit,
	channelToByte,
	colorToHex,
	hsvToRgb,
	parseByte,
	parseHex,
	resolveHsv,
	rgbToHsv,
	sameColor,
} = await import(pathToFileURL(join(root, "src/ui/packages/colorPicker/components/colorValue.ts")).href);
if (channelToByte(1) !== 255 || channelToByte(0) !== 0) throw new Error("channel bytes");
if (byteToUnit(128) !== 128 / 255) throw new Error("byte unit");
const red = rgbToHsv(1, 0, 0);
if (Math.abs(red.h) > 1e-6 || red.s !== 1 || red.v !== 1) throw new Error("red hsv");
const back = hsvToRgb(red.h, red.s, red.v);
if (Math.abs(back.r - 1) > 1e-6 || Math.abs(back.g) > 1e-6 || Math.abs(back.b) > 1e-6) throw new Error("hsv roundtrip");
const gray = new Color3(0.5, 0.5, 0.5);
const kept = resolveHsv(gray, { h: 0.25, s: 1, v: 1 });
if (kept.h !== 0.25 || kept.s !== 0 || Math.abs(kept.v - 0.5) > 1e-6) throw new Error("gray keeps hue");
if (parseHex("#336699") === undefined) throw new Error("hex parses");
if (parseHex("#369") === undefined) throw new Error("short hex parses");
if (parseHex("nope") !== undefined) throw new Error("bad hex rejected");
if (parseByte("256") !== undefined || parseByte("1.5") !== undefined) throw new Error("byte bounds");
if (parseByte("12") !== 12) throw new Error("byte commits");
const painted = parseHex("#FF0000");
if (!sameColor(painted, new Color3(1, 0, 0))) throw new Error("hex red");
if (colorToHex(new Color3(1, 0, 0)) !== "#FF0000") throw new Error("hex format");

const { nextChecked } = await import(
	pathToFileURL(join(root, "src/ui/packages/checkbox/components/nextChecked.ts")).href
);
if (nextChecked(false) !== true) throw new Error("unchecked toggles on");
if (nextChecked(true) !== false) throw new Error("checked toggles off");
if (nextChecked(true, true) !== true) throw new Error("mixed commits checked");
if (nextChecked(false, true) !== true) throw new Error("mixed commits checked");

const {
	checkboxMark,
	checkboxPointer,
	checkboxBoxTransparency,
	checkboxStrokeTransparency,
} = await import(pathToFileURL(join(root, "src/ui/packages/checkbox/components/checkboxLook.ts")).href);
if (checkboxMark(false) !== "") throw new Error("unchecked mark empty");
if (checkboxMark(true) !== "✓") throw new Error("checked mark is check");
if (checkboxMark(false, true) !== "–") throw new Error("mixed mark is dash");
if (checkboxPointer(false, true, true) !== "press") throw new Error("press wins over focus");
if (checkboxPointer(true, false, true) !== "focus") throw new Error("focus wins over hover");
if (checkboxPointer(true, false, false) !== "hover") throw new Error("hover when active");
if (checkboxBoxTransparency(false, false, "rest") !== 1) throw new Error("unchecked rest is hollow");
if (checkboxBoxTransparency(true, false, "rest") !== 0) throw new Error("checked rest is solid");
if (checkboxBoxTransparency(true, true, "rest") !== 0.55) throw new Error("disabled checked fades");
if (checkboxBoxTransparency(false, false, "hover") !== 0.85) throw new Error("unchecked hover tints");
if (checkboxStrokeTransparency(false, true, "rest") !== 0.55) throw new Error("disabled stroke fades");
if (checkboxStrokeTransparency(false, false, "focus") !== 0) throw new Error("focus stroke is solid");

const {
	switchPointer,
	switchTrackTransparency,
	switchThumbTransparency,
	switchStrokeTransparency,
	switchThumbPlacement,
} = await import(pathToFileURL(join(root, "src/ui/packages/switch/components/switchLook.ts")).href);
if (switchPointer(false, true, true) !== "press") throw new Error("switch press wins");
if (switchPointer(true, false, true) !== "focus") throw new Error("switch focus wins");
if (switchPointer(true, false, false) !== "hover") throw new Error("switch hover");
if (switchTrackTransparency(true, false, "rest") !== 0) throw new Error("on track solid");
if (switchTrackTransparency(false, false, "rest") !== 0.35) throw new Error("off track muted");
if (switchTrackTransparency(true, true, "rest") !== 0.55) throw new Error("disabled on fades");
if (switchThumbTransparency(true) !== 0.35) throw new Error("disabled thumb fades");
if (switchStrokeTransparency(false, "focus") !== 0) throw new Error("focus stroke solid");
if (switchStrokeTransparency(true, "focus") !== 1) throw new Error("disabled stroke hidden");
const onThumb = switchThumbPlacement(true, 3);
const offThumb = switchThumbPlacement(false, 3);
if (onThumb.scaleX !== 1 || onThumb.offsetX !== -3 || onThumb.anchorX !== 1) throw new Error("on thumb placement");
if (offThumb.scaleX !== 0 || offThumb.offsetX !== 3 || offThumb.anchorX !== 0) throw new Error("off thumb placement");

const { nudgeDelta, nudgeValue, isSliderDrag, isSliderMove } = await import(
	pathToFileURL(join(root, "src/ui/packages/slider/components/sliderNudge.ts")).href
);
if (nudgeDelta("Left") !== -1 || nudgeDelta("DPadRight") !== 1 || nudgeDelta("ButtonL") !== -1) {
	throw new Error("slider key directions");
}
if (nudgeDelta("Escape") !== undefined) throw new Error("slider ignores unrelated keys");
if (nudgeValue(5, 0, 10, 1, 1) !== 6) throw new Error("slider step nudge");
if (nudgeValue(5, 0, 10, 1, -1) !== 4) throw new Error("slider step back");
if (nudgeValue(9, 0, 10, 1, 1) !== 10) throw new Error("slider clamps max");
if (nudgeValue(0, 0, 10, undefined, 1) !== 1) throw new Error("slider default tenth step");
if (!isSliderDrag("MouseButton1") || !isSliderDrag("Touch") || isSliderDrag("Keyboard")) {
	throw new Error("slider drag kinds");
}
if (!isSliderMove("MouseMovement") || !isSliderMove("Touch") || isSliderMove("MouseButton1")) {
	throw new Error("slider move kinds");
}

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

const { shouldHandleSelectKey } = await import(
	pathToFileURL(join(root, "src/ui/packages/select/components/selectKey.ts")).href
);
if (!shouldHandleSelectKey(false, true, false, false, "Down", 1)) throw new Error("focused select hears keys without the pointer");
if (!shouldHandleSelectKey(true, false, false, false, "Escape", 1)) throw new Error("open select hears keys");
if (shouldHandleSelectKey(true, true, false, true, "Down", 1)) throw new Error("textbox keeps its keys");
if (shouldHandleSelectKey(false, false, false, false, "Down", 1)) throw new Error("idle select ignores keys");
const prior = { key: "Down", at: 1 };
if (shouldHandleSelectKey(true, false, true, false, "Down", 1.01, prior)) throw new Error("same key twice in one frame");
if (!shouldHandleSelectKey(true, false, true, false, "Down", 1.02, prior)) throw new Error("key repeat still registers");

const { canFocusGui } = await import(
	pathToFileURL(join(root, "src/ui/packages/select/components/selectFocus.ts")).href
);
if (canFocusGui(undefined) || canFocusGui({})) throw new Error("unparented cannot steal focus");
if (canFocusGui({ Parent: {}, FindFirstAncestorWhichIsA: () => undefined })) throw new Error("plugin gui cannot steal focus");
if (!canFocusGui({ Parent: {}, FindFirstAncestorWhichIsA: () => ({}) })) throw new Error("player gui can steal focus");

const { popupPlacement } = await import(
	pathToFileURL(join(root, "src/ui/packages/popup/components/placement.ts")).href
);
const below = popupPlacement(100, 200, 80, 24, 10, 20, 400);
if (below.above || below.x !== 90 || below.y !== 204 || below.width !== 80) throw new Error("list opens under the anchor");
if (below.maxHeight !== 196) throw new Error("below uses the space under the anchor");
const moved = popupPlacement(140, 200, 120, 24, 10, 20, 400, 1000, 40);
if (moved.above || moved.x !== 130 || moved.width !== 120) throw new Error("list follows a moved or resized anchor");
const above = popupPlacement(100, 300, 80, 24, 0, 0, 400, 800, 120);
if (!above.above || above.y !== 300 || above.maxHeight !== 300) throw new Error("list flips above the anchor");
const clamped = popupPlacement(950, 40, 200, 24, 0, 0, 500, 1000, 40);
if (clamped.x !== 800 || clamped.width !== 200) throw new Error("list clamps to the right edge");
const left = popupPlacement(-30, 40, 80, 24, 10, 0, 500, 400, 40);
if (left.x !== 0) throw new Error("list clamps to the left edge");
const wide = popupPlacement(10, 10, 500, 20, 0, 0, 400, 320, 40);
if (wide.width !== 320 || wide.x !== 0) throw new Error("list width stays inside the layer");

const { nextCanvasPosition, shouldBeginDragScroll } = await import(
	pathToFileURL(join(root, "src/ui/packages/scroll/dragScroll.ts")).href
);
if (shouldBeginDragScroll(new Vector2(0, 0), new Vector2(0, 5), "y")) throw new Error("under threshold stays a click");
if (!shouldBeginDragScroll(new Vector2(0, 0), new Vector2(0, 6), "y")) throw new Error("threshold starts a drag");
if (shouldBeginDragScroll(new Vector2(0, 0), new Vector2(10, 4), "y")) throw new Error("horizontal wins over vertical axis");
if (!shouldBeginDragScroll(new Vector2(0, 0), new Vector2(10, 4), "x")) throw new Error("horizontal drag on x axis");
const scrolled = nextCanvasPosition(new Vector2(0, 20), new Vector2(0, 40), new Vector2(0, 10), "y", new Vector2(0, 200));
if (scrolled.X !== 0 || scrolled.Y !== 50) throw new Error("drag moves canvas by pointer delta");
const clampedCanvas = nextCanvasPosition(new Vector2(0, 0), new Vector2(0, 0), new Vector2(0, 40), "y", new Vector2(0, 10));
if (clampedCanvas.Y !== 0) throw new Error("canvas clamps at top");

const { clampSplit } = await import(
	pathToFileURL(join(root, "src/ui/packages/splitPane/components/splitSize.ts")).href
);
if (clampSplit(240, 1000, 200, 340) !== 240) throw new Error("in-bounds size is kept");
if (clampSplit(100, 1000, 200, 340) !== 200) throw new Error("clamps to min");
if (clampSplit(900, 1000, 200, 340) !== 340) throw new Error("clamps to max");
if (clampSplit(900, 1000, 200) !== 800) throw new Error("second pane keeps min");
if (clampSplit(300, 300, 200, 340) !== 200) throw new Error("short dock favors first pane min");
if (clampSplit(50, 0) !== 0) throw new Error("unmeasured pane collapses");

const { splitHitTransparency, splitMarkTransparency, splitPointer } = await import(
	pathToFileURL(join(root, "src/ui/packages/splitPane/components/splitLook.ts")).href
);
if (splitPointer(false, false) !== "rest") throw new Error("idle divider is rest");
if (splitPointer(true, false) !== "hover") throw new Error("hover wins over rest");
if (splitPointer(true, true) !== "press") throw new Error("drag wins over hover");
if (splitMarkTransparency("rest") <= splitMarkTransparency("hover")) throw new Error("hover marks are clearer");
if (splitMarkTransparency("press") !== 0) throw new Error("drag marks are solid");
if (splitMarkTransparency("rest", true) < splitMarkTransparency("rest")) throw new Error("disabled marks fade");
if (splitHitTransparency("rest") !== 1) throw new Error("idle hit target stays clear");
if (splitHitTransparency("hover") >= 1) throw new Error("hover wash shows interactivity");
if (splitHitTransparency("press") >= splitHitTransparency("hover")) throw new Error("drag wash is stronger");

const { visibleWindow, ensureVisibleScroll, itemOffset } = await import(
	pathToFileURL(join(root, "src/ui/packages/virtualList/components/virtualWindow.ts")).href
);
const mid = visibleWindow(240, 200, 5000, 24, 2);
if (mid.start !== 8 || mid.end !== 20) throw new Error("window tracks scroll with overscan");
const top = visibleWindow(0, 200, 5000, 24, 2);
if (top.start !== 0 || top.end !== 10) throw new Error("top window includes overscan below");
const emptyWindow = visibleWindow(0, 200, 0, 24, 2);
if (emptyWindow.end !== -1) throw new Error("empty list mounts no rows");
const large = visibleWindow(0, 400, 5000, 24, 3);
if (large.end - large.start + 1 > 30) throw new Error("5000-row list only mounts a window");
if (large.end - large.start + 1 < 10) throw new Error("window covers the viewport");
if (ensureVisibleScroll(0, 200, 20, 5000, 24, "nearest") !== 304) {
	throw new Error("ensureVisible scrolls down to reveal row");
}
if (ensureVisibleScroll(480, 200, 5, 5000, 24, "nearest") !== 120) {
	throw new Error("ensureVisible scrolls up to reveal row");
}
if (ensureVisibleScroll(200, 200, 10, 5000, 24, "nearest") !== 200) {
	throw new Error("ensureVisible keeps scroll when already visible");
}
if (ensureVisibleScroll(0, 200, 10, 5000, 24, "start") !== 240) {
	throw new Error("ensureVisible start aligns row to top");
}
if (ensureVisibleScroll(0, 200, 10, 5000, 24, "center") !== 152) {
	throw new Error("ensureVisible center centers the row");
}
const keys = [];
for (let index = mid.start; index <= mid.end; index++) keys.push(`row-${index}`);
if (keys[0] !== "row-8" || keys[keys.length - 1] !== "row-20") throw new Error("stable keys follow item indices");
if (itemOffset(10, 24) !== 240) throw new Error("item offset is index times height");

const { stateMatrix } = await import(pathToFileURL(join(root, "src/ui/packages/stateMatrix.ts")).href);
const components = [
	"Button",
	"Input",
	"Checkbox",
	"Switch",
	"Slider",
	"RadioGroup",
	"Select",
	"Tabs",
	"SplitPane",
	"Tooltip",
	"TreeView",
];
const names = new Set();
for (const row of stateMatrix) {
	if (names.has(row.name)) throw new Error(`duplicate capture ${row.name}`);
	names.add(row.name);
	if (row.theme !== "Dark" && row.theme !== "Light") throw new Error(`${row.name} theme`);
	if (row.width <= 0) throw new Error(`${row.name} width`);
}
for (const component of components) {
	const rows = stateMatrix.filter((row) => row.component === component);
	if (!rows.some((row) => row.theme === "Dark" && row.pointer === "rest" && !row.disabled)) {
		throw new Error(`${component} missing default dark`);
	}
	if (!rows.some((row) => row.theme === "Light" && row.pointer === "rest")) {
		throw new Error(`${component} missing light`);
	}
	if (!rows.some((row) => row.width <= 120 && row.text.length > 40)) {
		throw new Error(`${component} missing long text at narrow width`);
	}
}
for (const component of ["Button", "Checkbox", "Switch", "Slider", "RadioGroup", "Select", "Tabs", "SplitPane", "Tooltip", "TreeView"]) {
	if (!stateMatrix.some((row) => row.component === component && row.pointer === "hover")) {
		throw new Error(`${component} missing hover`);
	}
}
for (const component of ["Button", "Checkbox", "Switch", "Slider", "Select", "SplitPane"]) {
	if (!stateMatrix.some((row) => row.component === component && row.pointer === "press")) {
		throw new Error(`${component} missing press`);
	}
}
for (const component of ["Button", "Input", "Checkbox", "Switch", "Slider", "RadioGroup", "Select", "Tabs", "SplitPane"]) {
	if (!stateMatrix.some((row) => row.component === component && row.disabled === true)) {
		throw new Error(`${component} missing disabled`);
	}
}
if (!stateMatrix.some((row) => row.component === "Checkbox" && row.disabled === true && row.value !== true)) {
	throw new Error("Checkbox missing disabled unchecked");
}
if (!stateMatrix.some((row) => row.component === "Checkbox" && row.disabled === true && row.value === true)) {
	throw new Error("Checkbox missing disabled checked");
}
for (const pointer of ["press", "focus"]) {
	if (!stateMatrix.some((row) => row.component === "Checkbox" && row.value === true && row.pointer === pointer)) {
		throw new Error(`Checkbox missing checked ${pointer}`);
	}
}
if (!stateMatrix.some((row) => row.component === "Switch" && row.disabled === true && row.value !== true)) {
	throw new Error("Switch missing disabled off");
}
if (!stateMatrix.some((row) => row.component === "Switch" && row.disabled === true && row.value === true)) {
	throw new Error("Switch missing disabled on");
}
for (const pointer of ["hover", "press", "focus"]) {
	if (!stateMatrix.some((row) => row.component === "Switch" && row.value === true && row.pointer === pointer)) {
		throw new Error(`Switch missing on ${pointer}`);
	}
	if (!stateMatrix.some((row) => row.component === "Slider" && row.pointer === pointer)) {
		throw new Error(`Slider missing ${pointer}`);
	}
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
import { NumberInputProps } from "ui/packages/numberInput";
import { SliderProps } from "ui/packages/slider";
import { RadioGroupProps } from "ui/packages/radioGroup";
import { SelectProps } from "ui/packages/select";
import { TabsProps } from "ui/packages/tabs";
import { SplitPaneProps } from "ui/packages/splitPane";
import { TooltipProps } from "ui/packages/tooltip";
import { VirtualListProps } from "ui/packages/virtualList";
import { StateCapture } from "ui/packages/stateMatrix";
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
const virtualList: VirtualListProps<string> = {
	items: ["a", "b"],
	getKey: (item: string) => item,
	renderItem: (() => undefined) as unknown as VirtualListProps<string>["renderItem"],
	itemHeight: 24,
	overscan: 2,
};
void button;
void icon;
void input;
void checkbox;
void toggle;
void nestedBranch;
void virtualList;
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
const tooltip: TooltipProps = { text: "Reset", delay: 0.2 };
void tooltip;
const capture: StateCapture = {
	component: "Button",
	name: "default-dark",
	theme: "Dark",
	width: 280,
	pointer: "rest",
	text: "Continue",
	disabled: false,
};
void capture;
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
