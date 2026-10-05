export interface Hsv {
	h: number;
	s: number;
	v: number;
}

function finite(value: number) {
	return value === value && value !== math.huge && value !== -math.huge;
}

export function channelToByte(unit: number) {
	return math.clamp(math.floor(unit * 255 + 0.5), 0, 255);
}

export function byteToUnit(byte: number) {
	return math.clamp(byte, 0, 255) / 255;
}

export function rgbToHsv(r: number, g: number, b: number): Hsv {
	const max = math.max(r, g, b);
	const min = math.min(r, g, b);
	const delta = max - min;
	let h = 0;
	if (delta !== 0) {
		if (max === r) h = ((g - b) / delta) % 6;
		else if (max === g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h /= 6;
		if (h < 0) h += 1;
	}
	return { h, s: max === 0 ? 0 : delta / max, v: max };
}

export function hsvToRgb(h: number, s: number, v: number): { r: number; g: number; b: number } {
	const hue = ((h % 1) + 1) % 1;
	const c = v * s;
	const x = c * (1 - math.abs(((hue * 6) % 2) - 1));
	const m = v - c;
	let r = 0;
	let g = 0;
	let b = 0;
	const sector = math.floor(hue * 6);
	if (sector === 0) {
		r = c;
		g = x;
	} else if (sector === 1) {
		r = x;
		g = c;
	} else if (sector === 2) {
		g = c;
		b = x;
	} else if (sector === 3) {
		g = x;
		b = c;
	} else if (sector === 4) {
		r = x;
		b = c;
	} else {
		r = c;
		b = x;
	}
	return { r: r + m, g: g + m, b: b + m };
}

export function hsvToColor3(h: number, s: number, v: number) {
	const rgb = hsvToRgb(h, s, v);
	return new Color3(rgb.r, rgb.g, rgb.b);
}

export function colorToHex(color: Color3) {
	const r = string.format("%02X", channelToByte(color.R));
	const g = string.format("%02X", channelToByte(color.G));
	const b = string.format("%02X", channelToByte(color.B));
	return `#${r}${g}${b}`;
}

export function parseHex(text: string): Color3 | undefined {
	let raw = text;
	if (raw.sub(1, 1) === "#") raw = raw.sub(2);
	if (raw.size() === 3) {
		const r = raw.sub(1, 1);
		const g = raw.sub(2, 2);
		const b = raw.sub(3, 3);
		raw = `${r}${r}${g}${g}${b}${b}`;
	}
	if (raw.size() !== 6) return undefined;
	const value = tonumber(raw, 16);
	if (value === undefined || !finite(value)) return undefined;
	const r = math.floor(value / 65536) % 256;
	const g = math.floor(value / 256) % 256;
	const b = value % 256;
	return new Color3(byteToUnit(r), byteToUnit(g), byteToUnit(b));
}

export function parseByte(text: string): number | undefined {
	const value = tonumber(text);
	if (value === undefined || !finite(value)) return undefined;
	if (value < 0 || value > 255 || value % 1 !== 0) return undefined;
	return value;
}

export function sameColor(a: Color3, b: Color3) {
	return a.R === b.R && a.G === b.G && a.B === b.B;
}

export function resolveHsv(color: Color3, previous?: Hsv): Hsv {
	const hsv = rgbToHsv(color.R, color.G, color.B);
	if (hsv.s === 0 && previous !== undefined) return { h: previous.h, s: hsv.s, v: hsv.v };
	return hsv;
}

const RECENT_CAP = 8;
let recent: Color3[] = [];

export function rememberColor(color: Color3) {
	const remembered: Color3[] = [color];
	for (const existing of recent) {
		if (!sameColor(existing, color) && remembered.size() < RECENT_CAP) remembered.push(existing);
	}
	recent = remembered;
}

export function recentColors() {
	return recent;
}

export function colorBytes(color: Color3) {
	return `${channelToByte(color.R)}, ${channelToByte(color.G)}, ${channelToByte(color.B)}`;
}
