import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { readFileSync } from "node:fs";

const root = process.cwd();

class Color3 {
	constructor(r, g, b) {
		this.R = r;
		this.G = g;
		this.B = b;
	}
	static fromRGB(r, g, b) {
		return new Color3(r / 255, g / 255, b / 255);
	}
}

globalThis.Color3 = Color3;
globalThis.math = Math;

const { contrastRatio, lighten, mix } = await import(
	pathToFileURL(join(root, "src/theme/utilites/colorMath.ts")).href
);

const hex = (value) => {
	const n = Number.parseInt(value.slice(1), 16);
	return Color3.fromRGB((n >> 16) & 255, (n >> 8) & 255, n & 255);
};

const Common = { Black: hex("#121212"), White: hex("#FFFFFF") };
const Gray = {
	120: hex("#171717"),
	110: hex("#1D1D1D"),
	100: hex("#222222"),
	90: hex("#2C2C2C"),
	80: hex("#3B3B3B"),
	70: hex("#565656"),
	60: hex("#989898"),
	50: hex("#CBCBCB"),
	40: hex("#E1E1E1"),
	30: hex("#EDEDED"),
	20: hex("#F6F6F6"),
	10: hex("#FAFAFA"),
};
const Blue = {
	110: hex("#002E49"),
	100: hex("#00456D"),
	90: hex("#005D92"),
	80: hex("#0074B6"),
	70: hex("#008BDB"),
	60: hex("#00A2FF"),
	50: hex("#2BB1FF"),
	40: hex("#55C1FF"),
	30: hex("#80D0FF"),
	10: hex("#D5F0FF"),
};
// Blue[90] used by light status.info
const Purple = {
	80: hex("#4918AF"),
	70: hex("#581DD2"),
	60: hex("#6D34E3"),
	50: hex("#8556E8"),
	40: hex("#9E78EC"),
	30: hex("#B69AF1"),
};
const Green = {
	110: hex("#00351D"),
	90: hex("#006939"),
	80: hex("#008347"),
	70: hex("#009e56"),
	60: hex("#00B864"),
	50: hex("#00E87E"),
	10: hex("#C9FFE6"),
};
const Yellow = {
	110: hex("#564004"),
	100: hex("#816006"),
	90: hex("#AD8007"),
	70: hex("#F5BA19"),
	60: hex("#F7C744"),
	10: hex("#FEF6E0"),
};
const Red = {
	110: hex("#510905"),
	80: hex("#CB160E"),
	70: hex("#EF1E14"),
	60: hex("#F2453D"),
	50: hex("#F4645D"),
	10: hex("#FDE0DF"),
};

const brand = (main, on, hover, pressed) => ({ main, on, hover, pressed });
const status = (main, on, surface, border) => ({ main, on, surface, border });

// Keep in sync with src/theme/themes/createPalette.ts
const light = {
	surface: {
		canvas: Common.White,
		paper: Gray[20],
		elevated: Common.White,
		overlay: Common.White,
		input: Common.White,
	},
	primary: brand(Blue[80], Common.White, Blue[70], Blue[90]),
	accent: brand(Purple[70], Common.White, Purple[60], Purple[80]),
	text: {
		primary: Common.Black,
		secondary: Gray[70],
		disabled: Gray[60],
		inverse: Common.White,
		link: Blue[80],
	},
	border: Gray[70],
	divider: Gray[50],
	focus: Blue[80],
	action: {
		hover: mix(Gray[40], Common.White, 0.35),
		pressed: Gray[40],
		selected: Blue[10],
		disabled: Gray[60],
	},
	status: {
		success: status(Green[90], Common.White, Green[10], Green[80]),
		warning: status(Yellow[100], Common.White, Yellow[10], Yellow[90]),
		error: status(Red[80], Common.White, Red[10], Red[70]),
		info: status(Blue[90], Common.White, Blue[10], Blue[80]),
	},
};

const dark = {
	surface: {
		canvas: Common.Black,
		paper: Gray[100],
		elevated: Gray[90],
		overlay: Gray[80],
		input: Gray[100],
	},
	primary: brand(Blue[50], Common.Black, Blue[40], Blue[60]),
	accent: brand(Purple[40], Common.Black, Purple[30], Purple[50]),
	text: {
		primary: Common.White,
		secondary: Gray[50],
		disabled: Gray[70],
		inverse: Common.Black,
		link: Blue[40],
	},
	border: Gray[60],
	divider: Gray[70],
	focus: Blue[50],
	action: {
		hover: lighten(Gray[90], 0.08),
		pressed: Gray[80],
		selected: mix(Blue[110], Gray[90], 0.45),
		disabled: Gray[70],
	},
	status: {
		success: status(Green[50], Common.Black, Green[110], Green[60]),
		warning: status(Yellow[60], Common.Black, Yellow[110], Yellow[70]),
		error: status(Red[50], Common.Black, Red[110], Red[60]),
		info: status(Blue[50], Common.Black, Blue[110], Blue[60]),
	},
};

const source = readFileSync(join(root, "src/theme/themes/createPalette.ts"), "utf8");
for (const token of ["Blue[80]", "Purple[70]", "Blue[50]", "Purple[40]", "Gray[20]", "Gray[100]"]) {
	if (!source.includes(token)) throw new Error(`createPalette.ts missing ${token}; contrast map stale`);
}

const TEXT = 4.5;
const UI = 3;
const isException = (name) =>
	name.startsWith("divider/") || name.startsWith("text.disabled/") || name.startsWith("action.disabled/");

const check = (name, fg, bg, min) => {
	if (fg === undefined || bg === undefined) throw new Error(`missing color for ${name}`);
	const ratio = contrastRatio(fg, bg);
	if (isException(name)) {
		if (ratio < 1.2) throw new Error(`${name}: ${ratio.toFixed(2)} too low even for exception`);
		return { name, ratio, exception: true };
	}
	if (ratio + 1e-6 < min) throw new Error(`${name}: ${ratio.toFixed(2)} < ${min}`);
	return { name, ratio, exception: false };
};

const run = (label, palette) => {
	const results = [];
	for (const surface of ["canvas", "paper", "elevated", "overlay", "input"]) {
		const bg = palette.surface[surface];
		results.push(check(`text.primary/surface.${surface}`, palette.text.primary, bg, TEXT));
		results.push(check(`text.secondary/surface.${surface}`, palette.text.secondary, bg, TEXT));
		results.push(check(`text.link/surface.${surface}`, palette.text.link, bg, TEXT));
		results.push(check(`text.disabled/surface.${surface}`, palette.text.disabled, bg, TEXT));
		results.push(check(`border/surface.${surface}`, palette.border, bg, UI));
		results.push(check(`focus/surface.${surface}`, palette.focus, bg, UI));
		results.push(check(`divider/surface.${surface}`, palette.divider, bg, UI));
		results.push(check(`action.disabled/surface.${surface}`, palette.action.disabled, bg, UI));
	}
	results.push(check("primary.on/primary.main", palette.primary.on, palette.primary.main, TEXT));
	results.push(check("accent.on/accent.main", palette.accent.on, palette.accent.main, TEXT));
	for (const key of ["success", "warning", "error", "info"]) {
		const role = palette.status[key];
		results.push(check(`status.${key}.on/main`, role.on, role.main, TEXT));
		results.push(check(`status.${key}.main/surface`, role.main, role.surface, TEXT));
		results.push(check(`status.${key}.border/surface`, role.border, role.surface, UI));
	}
	const exceptions = results.filter((r) => r.exception).length;
	console.log(`${label}: ${results.length - exceptions} enforced, ${exceptions} exceptions`);
	return results;
};

run("Light", light);
run("Dark", dark);
console.log("contrast ok");
