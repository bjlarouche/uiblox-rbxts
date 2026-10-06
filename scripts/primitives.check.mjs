import { execSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
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
if (inputInsets(true, false, 12, 4).left !== 20) throw new Error("start adornment pads both sides of icon");
if (inputInsets(false, true, 12, 4).right !== 20) throw new Error("end adornment pads both sides of icon");
if (inputInsets(true, true, 12, 4).left !== 20 || inputInsets(true, true, 12, 4).right !== 20) {
	throw new Error("both adornments inset both sides");
}
globalThis.math = {
	max: Math.max,
	floor: Math.floor,
	clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
};
const { multilineHeight } = await import(
	pathToFileURL(join(root, "src/ui/packages/input/components/multilineHeight.ts")).href
);
if (multilineHeight(10, 16, 2, 5, 8) !== 48) throw new Error("multiline minimum");
if (multilineHeight(54, 16, 2, 5, 8) !== 70) throw new Error("multiline content");
if (multilineHeight(200, 16, 2, 5, 8) !== 96) throw new Error("multiline maximum");
if (multilineHeight(10, 16, 4, 2, 8) !== 80) throw new Error("multiline row bounds");
if (canActivate(true, false)) throw new Error("disabled must not activate");
if (canActivate(false, true)) throw new Error("loading must not activate");
if (!canActivate(false, false)) throw new Error("enabled control must activate");

const { stopOnce, clampUnit, progressUnit, progressSpin, arcKeys, spinArcKeys } = await import(
	pathToFileURL(join(root, "src/ui/packages/motion/unit.ts")).href
);
let destroyed = 0;
const stop = stopOnce(() => {
	destroyed += 1;
});
stop();
stop();
if (destroyed !== 1) throw new Error("tween cleanup runs once");

const { motionDuration } = await import(
	pathToFileURL(join(root, "src/ui/packages/motion/duration.ts")).href
);
if (motionDuration(0.14) !== 0.14) throw new Error("motion keeps a positive duration");
if (motionDuration(0.14, true) !== 0) throw new Error("reduced motion snaps");
if (motionDuration(0) !== 0 || motionDuration(-1) !== 0 || motionDuration(Number.NaN) !== 0) {
	throw new Error("invalid motion duration snaps");
}

if (clampUnit(-0.2) !== 0) throw new Error("unit clamps below 0");
if (clampUnit(1.4) !== 1) throw new Error("unit clamps above 1");
if (clampUnit(Number.NaN) !== 0) throw new Error("NaN unit is 0");
if (clampUnit(0.25) !== 0.25) throw new Error("unit keeps a fraction");

const { skeletonMotion, skeletonLineWidth } = await import(
	pathToFileURL(join(root, "src/ui/packages/skeleton/components/skeletonMotion.ts")).href
);
if (skeletonMotion(undefined, false) !== "shimmer") throw new Error("skeleton shimmers by default");
if (skeletonMotion("shimmer", true) !== false) throw new Error("reduced motion holds skeleton still");
if (skeletonMotion(false, false) !== false) throw new Error("skeleton animation false is static");
if (skeletonMotion("pulse", false) !== "pulse") throw new Error("skeleton pulse stays available");
if (skeletonLineWidth(100, 0, 3) !== 100) throw new Error("leading skeleton lines keep width");
if (skeletonLineWidth(100, 2, 3) !== 62) throw new Error("last skeleton line is shorter");

if (progressUnit(1.5) !== 1) throw new Error("progress value clamps to 1");
if (progressUnit(-1) !== 0) throw new Error("progress value clamps to 0");
if (progressUnit(undefined, 50) !== 0.5) throw new Error("progress percent maps to half");
if (progressUnit(undefined, 150) !== 1) throw new Error("progress percent clamps to 100");
if (progressSpin(true, false, false) !== "spin") throw new Error("indeterminate progress spins");
if (progressSpin(true, true, false) !== false) throw new Error("reduced motion stops progress");
if (progressSpin(true, false, true) !== false) throw new Error("disabled progress stays still");
if (progressSpin(false, false, false) !== false) throw new Error("determinate progress does not spin");
if (arcKeys(0)[0].transparency !== 1) throw new Error("empty arc is clear");
if (arcKeys(1)[1].transparency !== 0) throw new Error("full arc is solid");
const spin = spinArcKeys();
if (spin[0].transparency !== 1 || spin[spin.length - 1].transparency !== 1) {
	throw new Error("spin arc clears at the seam");
}
if (!spin.some((key) => key.transparency === 0)) throw new Error("spin arc has an opaque head");

const { buttonFace, spinnerPlace, spinnerPixels, iconSpinnerPixels } = await import(
	pathToFileURL(join(root, "src/ui/packages/button/components/buttonLook.ts")).href
);
if (!buttonFace("Save", true).hideText) throw new Error("loading hides the caption");
if (buttonFace("Save", true, "Saving").text !== "Saving" || buttonFace("Save", true, "Saving").hideText) {
	throw new Error("loading label replaces the caption");
}
if (buttonFace("Save", false).text !== "Save" || buttonFace("Save", false).hideText) {
	throw new Error("idle caption stays");
}
if (spinnerPlace("start").xOffset !== 8 || spinnerPlace("end").xScale !== 1 || spinnerPlace("center").xScale !== 0.5) {
	throw new Error("spinner place");
}
if (spinnerPixels("small") !== 12 || spinnerPixels("large") !== 16) throw new Error("spinner size");
if (iconSpinnerPixels("xs") !== 8 || iconSpinnerPixels("xl") !== 16) throw new Error("icon spinner size");
for (const file of [
	"src/ui/packages/button/components/Button.styles.ts",
	"src/ui/packages/iconButton/components/IconButton.styles.ts",
]) {
	if (readFileSync(join(root, file), "utf8").includes("loading")) {
		throw new Error(`${file} must ignore loading so size stays put`);
	}
}

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
String.prototype.lower = function lower() {
	return this.toLowerCase();
};
String.prototype.find = function find(needle, start = 1, _plain) {
	const index = this.indexOf(needle, start - 1);
	return index < 0 ? [undefined] : [index + 1];
};
Array.prototype.size = function size() {
	return this.length;
};
Array.prototype.insert = function insert(at, value) {
	this.splice(at, 0, value);
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
globalThis.Vector3 = class Vector3 {
	constructor(x = 0, y = 0, z = 0) {
		this.X = x;
		this.Y = y;
		this.Z = z;
	}
};
globalThis.UDim = class UDim {
	constructor(scale = 0, offset = 0) {
		this.Scale = scale;
		this.Offset = offset;
	}
};
globalThis.UDim2 = class UDim2 {
	constructor(xScale = 0, xOffset = 0, yScale = 0, yOffset = 0) {
		this.X = new UDim(xScale, xOffset);
		this.Y = new UDim(yScale, yOffset);
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
const { formatNumber } = await import(
	pathToFileURL(join(root, "src/ui/packages/numberInput/components/numberValue.ts")).href
);
if (formatNumber(0.699999988079071) !== "0.7") throw new Error("format trims float tail");
if (formatNumber(0.30000001192092896) !== "0.3") throw new Error("format trims friction tail");
if (formatNumber(0.5) !== "0.5") throw new Error("format keeps a short decimal");
if (formatNumber(1) !== "1") throw new Error("format drops a zero fraction");
if (formatNumber(-1.25) !== "-1.25") throw new Error("format keeps a sign");

const {
	byteToUnit,
	channelToByte,
	colorBytes,
	colorToHex,
	hsvToRgb,
	parseByte,
	parseHex,
	recentColors,
	rememberColor,
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
if (colorBytes(new Color3(1, 0, 0)) !== "255, 0, 0") throw new Error("color bytes");
rememberColor(new Color3(1, 0, 0));
rememberColor(new Color3(0, 1, 0));
if (recentColors().length !== 2 || !sameColor(recentColors()[0], new Color3(0, 1, 0))) throw new Error("recent colors");

globalThis.ColorSequenceKeypoint = class ColorSequenceKeypoint {
	constructor(time, color) {
		this.Time = time;
		this.Value = color;
	}
};
globalThis.ColorSequence = class ColorSequence {
	constructor(keys) {
		this.Keypoints = keys;
	}
};
globalThis.NumberSequenceKeypoint = class NumberSequenceKeypoint {
	constructor(time, value, envelope = 0) {
		this.Time = time;
		this.Value = value;
		this.Envelope = envelope;
	}
};
globalThis.NumberSequence = class NumberSequence {
	constructor(keys) {
		this.Keypoints = keys;
	}
};

const {
	hitStop,
	insertColorStop,
	insertNumberStop,
	lerpColor,
	patchColorStop,
	readColorStops,
	removeColorStop,
	removeNumberStop,
	sampleColor,
	sequenceMove,
	sequencePress,
	writeColorStops,
	writeNumberStops,
} = await import(pathToFileURL(join(root, "src/ui/packages/colorPicker/components/sequenceValue.ts")).href);
const mixed = lerpColor(new Color3(0, 0, 0), new Color3(1, 1, 1), 0.5);
if (Math.abs(mixed.R - 0.5) > 1e-6) throw new Error("lerp color");
const stops = [
	{ t: 0, color: new Color3(1, 0, 0) },
	{ t: 1, color: new Color3(0, 0, 1) },
];
const sampled = sampleColor(stops, 0.5);
if (Math.abs(sampled.B - 0.5) > 1e-6) throw new Error("sample color");
const three = insertColorStop(stops, 0.25);
if (three.length !== 3 || Math.abs(three[1].t - 0.25) > 1e-6) throw new Error("insert color stop");
if (removeColorStop(three, 1).length !== 2) throw new Error("remove color stop");
if (removeColorStop(three, 0).length !== 3) throw new Error("keep end stops");
const patched = patchColorStop(three, 1, { color: new Color3(0, 1, 0) });
if (!sameColor(patched[1].color, new Color3(0, 1, 0))) throw new Error("patch color stop");
const written = writeColorStops(stops);
if (readColorStops(written).length !== 2) throw new Error("color sequence roundtrip");
if (hitStop([0, 0.5, 1], 0.52, 0.04) !== 1) throw new Error("hit stop");
if (hitStop([0, 1], 0.4, 0.04) !== -1) throw new Error("miss stop");
if (!sequencePress("Touch") || !sequencePress("MouseButton1") || sequencePress("MouseMovement")) throw new Error("sequence press");
if (!sequenceMove("Touch") || !sequenceMove("MouseMovement") || sequenceMove("MouseButton1")) throw new Error("sequence move");
const numbers = [
	{ t: 0, value: 0, envelope: 0 },
	{ t: 1, value: 1, envelope: 0 },
];
const added = insertNumberStop(numbers, 0.5);
if (added.length !== 3 || Math.abs(added[1].value - 0.5) > 1e-6) throw new Error("insert number stop");
if (removeNumberStop(added, 1).length !== 2) throw new Error("remove number stop");
if (writeNumberStops(numbers).Keypoints.length !== 2) throw new Error("number sequence write");

const { familyLabel, uniqueFamilies } = await import(
	pathToFileURL(join(root, "src/ui/packages/fontEditor/components/fontValue.ts")).href
);
if (familyLabel("rbxasset://fonts/families/Gotham.json") !== "Gotham") throw new Error("family label");
const families = uniqueFamilies([
	"rbxasset://fonts/families/Gotham.json",
	"rbxasset://fonts/families/Gotham.json",
	"rbxasset://fonts/families/BuilderSans.json",
]);
if (families.length !== 2 || families[0].label !== "BuilderSans") throw new Error("unique families");

const { filterChoices, usesSelectSearch } = await import(
	pathToFileURL(join(root, "src/ui/packages/select/components/selectFilter.ts")).href
);
if (!usesSelectSearch(9) || usesSelectSearch(3) || usesSelectSearch(20, false)) throw new Error("select search gate");
const hits = filterChoices(
	[
		{ label: "SourceSans", value: "SourceSans" },
		{ label: "Gotham", value: "Gotham" },
	],
	"goth",
);
if (hits.length !== 1 || hits[0].value !== "Gotham") throw new Error("select filter");

const { readAxis, writeUDim, writeUDim2, writeVector2, writeVector3 } = await import(
	pathToFileURL(join(root, "src/ui/packages/vectorEditor/components/vectorValue.ts")).href,
);
if (readAxis(new Vector2(1, 2), "Y") !== 2) throw new Error("vector2 axis");
const moved2 = writeVector2(new Vector2(1, 2), "X", 9);
if (moved2.X !== 9 || moved2.Y !== 2) throw new Error("vector2 write");
const moved3 = writeVector3(new Vector3(1, 2, 3), "Z", 4);
if (moved3.Z !== 4 || moved3.X !== 1) throw new Error("vector3 write");
const gap = writeUDim(new UDim(0.5, 8), "Offset", 12);
if (gap.Scale !== 0.5 || gap.Offset !== 12) throw new Error("udim write");
const span = writeUDim2(new UDim2(0.5, 1, 1, -2), "Y", "Offset", 0);
if (span.Y.Offset !== 0 || span.X.Scale !== 0.5) throw new Error("udim2 write");

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
const { treeRowLayout } = await import(
	pathToFileURL(join(root, "src/ui/packages/treeView/components/treeRows.ts")).href
);
const ladder = visibleRows(
	[
		{
			title: "Fixture",
			leaves: [{ title: "Loose" }],
			branches: [
				{
					title: "Animation",
					leaves: [{ title: "Tween Native" }, { title: "Tween React" }],
					branches: [{ title: "Easing", leaves: [{ title: "Linear" }], branches: [{ title: "Deep", leaves: [] }] }],
				},
			],
		},
	],
	["Fixture", "Fixture/Animation", "Fixture/Animation/Easing"],
);
const labelX = (row) => treeRowLayout(row.depth, 16, 16, 24).labelX;
const byPath = new Map(ladder.map((row) => [row.path, row]));
for (let depth = 0; depth <= 3; depth++) {
	const level = ladder.filter((row) => row.depth === depth);
	if (level.length === 0) throw new Error(`no rows at depth ${depth}`);
	if (depth > 0 && !(level.some((row) => row.kind === "branch") && level.some((row) => row.kind === "leaf"))) {
		throw new Error(`depth ${depth} needs a branch and a leaf`);
	}
	if (new Set(level.map(labelX)).size !== 1) throw new Error(`branch and leaf labels misalign at depth ${depth}`);
}
for (const row of ladder) {
	const parent = byPath.get(row.path.slice(0, row.path.lastIndexOf("/")));
	if (parent && labelX(row) <= labelX(parent)) throw new Error(`${row.path} label is not right of its parent`);
}

const deepLeaves = [];
for (let i = 0; i < 4999; i++) deepLeaves.push({ title: `Story${i}` });
const deepRows = visibleRows([{ title: "Package", leaves: deepLeaves }], ["Package"], "Package/Story2500");
if (deepRows.length !== 5000) throw new Error(`expected 5000 visible rows, got ${deepRows.length}`);
if (deepRows.findIndex((row) => row.path === "Package/Story2500") < 0) throw new Error("selected deep leaf missing");

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
const rightEdge = popupPlacement(950, 40, 200, 24, 0, 0, 500, 1000, 40);
if (rightEdge.x !== 800 || rightEdge.width !== 200) throw new Error("list clamps to the right edge");
const left = popupPlacement(-30, 40, 80, 24, 10, 0, 500, 400, 40);
if (left.x !== 0) throw new Error("list clamps to the left edge");
const wide = popupPlacement(10, 10, 500, 20, 0, 0, 400, 320, 40);
if (wide.width !== 320 || wide.x !== 0 || wide.height !== 40) throw new Error("list width stays inside the layer");
const tip = popupPlacement(100, 360, 40, 20, 0, 0, 400, 300, 48, 180);
if (!tip.above || tip.width !== 180 || tip.height !== 48 || tip.y !== 360) throw new Error("tip flips and uses its own size");
const tipClamp = popupPlacement(20, 10, 40, 20, 0, 0, 400, 100, 30, 180);
if (tipClamp.width !== 100 || tipClamp.x !== 0 || tipClamp.above) throw new Error("tip width clamps to the layer");

const { portalTarget } = await import(pathToFileURL(join(root, "src/ui/packages/popup/components/portalTarget.ts")).href);
const layerHost = {
	IsA: (name) => name === "LayerCollector",
	FindFirstAncestorWhichIsA: () => undefined,
};
const childHost = {
	IsA: () => false,
	FindFirstAncestorWhichIsA: (name) => (name === "LayerCollector" ? layerHost : undefined),
};
const looseHost = { IsA: () => false, FindFirstAncestorWhichIsA: () => undefined };
if (portalTarget(undefined) !== undefined) throw new Error("missing host has no target");
if (portalTarget(layerHost) !== layerHost) throw new Error("layer host is the target");
if (portalTarget(childHost) !== layerHost) throw new Error("host walks to the layer");
if (portalTarget(looseHost) !== undefined) throw new Error("unlayered host has no target");

const { isDismissInput } = await import(
	pathToFileURL(join(root, "src/ui/packages/modal/components/dismissInput.ts")).href
);
const { pointerRoute, isKeyKind, shouldTakeKey } = await import(
	pathToFileURL(join(root, "src/interaction/pointerRoute.ts")).href
);
if (pointerRoute(false) !== "local" || pointerRoute(undefined) !== "local") throw new Error("pointer stays on the control");
if (pointerRoute(true) !== "global") throw new Error("global pointer replaces the control listener");
if (!isKeyKind("Keyboard") || !isKeyKind("Gamepad1") || isKeyKind("MouseButton1")) throw new Error("key kinds");
if (shouldTakeKey(true) || !shouldTakeKey(false) || !shouldTakeKey(true, true)) throw new Error("processed keys stay out");

if (!isDismissInput({ KeyCode: { Name: "Escape" } })) throw new Error("escape dismisses");
if (!isDismissInput({ KeyCode: { Name: "ButtonB" } })) throw new Error("button b dismisses");
if (isDismissInput({ KeyCode: { Name: "ButtonA" } }) || isDismissInput({ KeyCode: { Name: "Return" } })) {
	throw new Error("confirm keys stay open");
}

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

const { clampSplit, splitBoxDims, splitRuleDims } = await import(
	pathToFileURL(join(root, "src/ui/packages/splitPane/components/splitSize.ts")).href
);
if (clampSplit(240, 1000, 200, 340) !== 240) throw new Error("in-bounds size is kept");
if (clampSplit(100, 1000, 200, 340) !== 200) throw new Error("clamps to min");
if (clampSplit(900, 1000, 200, 340) !== 340) throw new Error("clamps to max");
if (clampSplit(900, 1000, 200) !== 800) throw new Error("second pane keeps min");
if (clampSplit(300, 300, 200, 340) !== 200) throw new Error("short dock favors first pane min");
if (clampSplit(50, 0) !== 0) throw new Error("unmeasured pane collapses");
const axisOnly = (vertical, horizontal) =>
	vertical.xScale === horizontal.yScale &&
	vertical.xOffset === horizontal.yOffset &&
	vertical.yScale === horizontal.xScale &&
	vertical.yOffset === horizontal.xOffset;
if (!axisOnly(splitRuleDims(true, 1), splitRuleDims(false, 1))) throw new Error("rule dims only swap axis");
if (!axisOnly(splitBoxDims(true, 28, 2), splitBoxDims(false, 28, 2))) throw new Error("mark dims only swap axis");
if (!axisOnly(splitBoxDims(true, 28, 10), splitBoxDims(false, 28, 10))) throw new Error("grip dims only swap axis");

const { splitHitTransparency, splitMarkTransparency, splitPointer, splitRuleTransparency } = await import(
	pathToFileURL(join(root, "src/ui/packages/splitPane/components/splitLook.ts")).href
);
if (splitPointer(false, false) !== "rest") throw new Error("idle divider is rest");
if (splitPointer(true, false) !== "hover") throw new Error("hover wins over rest");
if (splitPointer(true, true) !== "press") throw new Error("drag wins over hover");
if (splitMarkTransparency("rest") <= splitMarkTransparency("hover")) throw new Error("hover marks are clearer");
if (splitMarkTransparency("rest") > 0.2) throw new Error("rest grip is too faint");
if (splitMarkTransparency("press") !== 0) throw new Error("drag marks are solid");
if (splitMarkTransparency("rest", true) < splitMarkTransparency("rest")) throw new Error("disabled marks fade");
if (splitRuleTransparency("rest") <= splitMarkTransparency("rest")) throw new Error("hairline stays fainter than the grip");
if (splitRuleTransparency("hover") >= splitRuleTransparency("rest")) throw new Error("hover hairline is clearer");
if (splitHitTransparency("rest") !== 1) throw new Error("idle hit target stays clear");
if (splitHitTransparency("hover") >= 1) throw new Error("hover wash shows interactivity");
if (splitHitTransparency("press") >= splitHitTransparency("hover")) throw new Error("drag wash is stronger");

const splitStyles = readFileSync(join(root, "src/ui/packages/splitPane/components/SplitPane.styles.ts"), "utf8");
if (!splitStyles.includes("theme.palette.surface.paper")) throw new Error("split body fills with surface paper");
if (!splitStyles.includes("theme.palette.divider")) throw new Error("split rule uses divider token");
if (!splitStyles.includes("theme.palette.text.secondary")) throw new Error("split marks use text.secondary");
if (!/body:\s*\{[^}]*BackgroundTransparency:\s*0/s.test(splitStyles)) {
	throw new Error("split body stays opaque under the transparent drag strip");
}

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
const deepSelected = deepRows.findIndex((row) => row.path === "Package/Story2500");
const deepWindow = visibleWindow(ensureVisibleScroll(0, 400, deepSelected, deepRows.length, 24, "nearest"), 400, deepRows.length, 24, 2);
if (deepWindow.end - deepWindow.start + 1 > 40) throw new Error("deep tree only mounts a window of rows");
if (deepSelected < deepWindow.start || deepSelected > deepWindow.end) throw new Error("selected deep leaf stays in the mounted window");

const { controlMetrics, resolveControlSize } = await import(
	pathToFileURL(join(root, "src/theme/interfaces/density/controlMetrics.ts")).href
);
if (resolveControlSize("comfortable") !== "medium") throw new Error("comfortable density defaults medium");
if (resolveControlSize("compact") !== "small") throw new Error("compact density defaults small");
if (resolveControlSize("compact", "large") !== "large") throw new Error("size prop wins over density");
const compact = controlMetrics("compact");
if (compact.checkbox !== 16 || compact.switchTrackW !== 32 || compact.switchTrackH !== 18 || compact.height !== 22) {
	throw new Error("compact metrics miss studio targets");
}
const medium = controlMetrics("comfortable");
if (medium.checkbox !== 20 || medium.switchTrackW !== 48 || medium.switchTrackH !== 24 || medium.height !== 24) {
	throw new Error("medium metrics miss game defaults");
}
const largeMetrics = controlMetrics("comfortable", "large");
if (largeMetrics.switchTrackW !== 60 || largeMetrics.switchTrackH !== 36 || largeMetrics.sliderHeight !== 36) {
	throw new Error("large metrics miss prior polish sizes");
}

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
for (const component of ["Button", "Input", "Checkbox", "Switch", "Slider", "RadioGroup", "Select"]) {
	if (!stateMatrix.some((row) => row.component === component && row.size === "small")) {
		throw new Error(`${component} missing size-small`);
	}
	if (!stateMatrix.some((row) => row.component === component && row.density === "compact")) {
		throw new Error(`${component} missing density-compact`);
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
if (!stateMatrix.some((row) => row.component === "Switch" && row.reducedMotion === true)) {
	throw new Error("Switch missing reduced motion");
}
for (const pointer of ["hover", "press", "focus"]) {
	if (!stateMatrix.some((row) => row.component === "Switch" && row.value === true && row.pointer === pointer)) {
		throw new Error(`Switch missing on ${pointer}`);
	}
	if (!stateMatrix.some((row) => row.component === "Slider" && row.pointer === pointer)) {
		throw new Error(`Slider missing ${pointer}`);
	}
}
for (const component of ["Skeleton", "CircularProgress", "LinearProgress", "IconButton"]) {
	if (!stateMatrix.some((row) => row.component === component && row.theme === "Dark")) {
		throw new Error(`${component} missing dark`);
	}
	if (!stateMatrix.some((row) => row.component === component && row.theme === "Light")) {
		throw new Error(`${component} missing light`);
	}
}
if (!stateMatrix.some((row) => row.component === "Skeleton" && row.animation === false)) {
	throw new Error("Skeleton missing static");
}
if (!stateMatrix.some((row) => row.component === "Skeleton" && row.reducedMotion === true)) {
	throw new Error("Skeleton missing reduced motion");
}
for (const component of ["CircularProgress", "LinearProgress"]) {
	for (const value of [0, 0.5, 1]) {
		if (!stateMatrix.some((row) => row.component === component && row.value === value)) {
			throw new Error(`${component} missing value ${value}`);
		}
	}
	if (!stateMatrix.some((row) => row.component === component && row.indeterminate === true && row.reducedMotion !== true)) {
		throw new Error(`${component} missing indeterminate`);
	}
	if (!stateMatrix.some((row) => row.component === component && row.reducedMotion === true)) {
		throw new Error(`${component} missing reduced motion`);
	}
	if (!stateMatrix.some((row) => row.component === component && row.disabled === true)) {
		throw new Error(`${component} missing disabled`);
	}
}
if (!stateMatrix.some((row) => row.component === "Button" && row.loading === true && row.disabled === true)) {
	throw new Error("Button missing loading disabled");
}
if (!stateMatrix.some((row) => row.component === "Button" && row.loading === true && row.reducedMotion === true)) {
	throw new Error("Button missing loading reduced motion");
}
if (!stateMatrix.some((row) => row.component === "Button" && row.loading === true && row.variant === "outlined")) {
	throw new Error("Button missing outlined loading");
}
if (!stateMatrix.some((row) => row.component === "IconButton" && row.loading === true)) {
	throw new Error("IconButton missing loading");
}
if (!stateMatrix.some((row) => row.component === "Dialog" && row.open === true)) {
	throw new Error("Dialog missing open");
}
if (!stateMatrix.some((row) => row.component === "Dialog" && row.open === false)) {
	throw new Error("Dialog missing closed");
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
import { CircularProgressProps } from "ui/packages/circularProgress";
import { IconButtonProps } from "ui/packages/iconButton";
import { InputProps } from "ui/packages/input";
import { LinearProgressProps } from "ui/packages/progressBar";
import { SkeletonProps } from "ui/packages/skeleton";
import { SwitchProps } from "ui/packages/switch";
import { NumberInputProps } from "ui/packages/numberInput";
import { SliderProps } from "ui/packages/slider";
import { RadioGroupProps } from "ui/packages/radioGroup";
import { SelectProps } from "ui/packages/select";
import { TabsProps } from "ui/packages/tabs";
import { SplitPaneProps } from "ui/packages/splitPane";
import { TooltipProps } from "ui/packages/tooltip";
import { DialogProps } from "ui/packages/dialog";
import { VirtualListProps } from "ui/packages/virtualList";
import { StateCapture } from "ui/packages/stateMatrix";
import { Branch } from "ui/packages/treeView";
import { Icons } from "ui/enums";

const button: ButtonProps = {
	text: "Save",
	disabled: false,
	loading: true,
	loadingLabel: "Saving",
	loadingPosition: "end",
	reducedMotion: true,
};
const icon: IconButtonProps = { icon: Icons.Save, tint: new Color3(1, 1, 1), disabled: true, loading: true };
const skeleton: SkeletonProps = { variant: "text", lines: 3, gap: 6, animation: false, reducedMotion: true };
const circular: CircularProgressProps = { value: 0.4, size: 20, thickness: 2, disabled: true };
const linear: LinearProgressProps = { value: 1.5, progress: 40, indeterminate: false, reducedMotion: true };
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
void skeleton;
void circular;
void linear;
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
const dialog: DialogProps = { open: true, title: "Save changes", onClose: () => {} };
void dialog;
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
