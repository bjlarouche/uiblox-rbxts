/** Dot-path into `theme.palette` (typed for common roles). */
export type PaletteToken =
	| "surface.canvas"
	| "surface.paper"
	| "surface.elevated"
	| "surface.overlay"
	| "surface.input"
	| "primary.main"
	| "primary.on"
	| "primary.hover"
	| "primary.pressed"
	| "accent.main"
	| "accent.on"
	| "accent.hover"
	| "accent.pressed"
	| "text.primary"
	| "text.secondary"
	| "text.disabled"
	| "text.inverse"
	| "text.link"
	| "border"
	| "divider"
	| "focus"
	| "action.hover"
	| "action.pressed"
	| "action.selected"
	| "action.disabled"
	| "status.success.main"
	| "status.success.on"
	| "status.success.surface"
	| "status.success.border"
	| "status.warning.main"
	| "status.warning.on"
	| "status.warning.surface"
	| "status.warning.border"
	| "status.error.main"
	| "status.error.on"
	| "status.error.surface"
	| "status.error.border"
	| "status.info.main"
	| "status.info.on"
	| "status.info.surface"
	| "status.info.border"
	| "backdrop"
	| "shadow";

export function resolvePaletteToken(palette: object, token: PaletteToken | Color3): Color3 {
	if (!typeIs(token, "string")) return token as Color3;
	const parts = (token as string).split(".");
	let cursor: unknown = palette;
	for (const part of parts) {
		if (cursor === undefined || typeOf(cursor) !== "table") return new Color3(0, 0, 0);
		cursor = (cursor as { [key: string]: unknown })[part];
	}
	if (typeIs(cursor, "Color3")) return cursor;
	return new Color3(0, 0, 0);
}

/** Matches `hooks/breakpoints` thresholds. Kept local so Node style checks need no path aliases. */
type Responsive<T> = T | { phone?: T; tablet?: T; desktop?: T };
function resolveResponsive<T>(value: Responsive<T> | undefined, width: number): T | undefined {
	if (value === undefined || typeOf(value) !== "table") return value as T | undefined;
	const record = value as { phone?: T; tablet?: T; desktop?: T };
	const size = width === width && width < math.huge && width > 0 ? width : 0;
	const name = size < 600 ? "phone" : size < 960 ? "tablet" : "desktop";
	if (name === "desktop") return record.desktop ?? record.tablet ?? record.phone;
	if (name === "tablet") return record.tablet ?? record.phone;
	return record.phone;
}

type PadSides = { top: number; right: number; bottom: number; left: number };
type PadInput = number | { x?: number; y?: number; top?: number; right?: number; bottom?: number; left?: number };

interface SxTheme {
	spacing: { calc: (multiple: number) => number };
	palette: object;
	typography: {
		fontFamilies: { [family: string]: Enum.Font };
		variants: { [name: string]: { size: number; family: string } };
	};
}

const SELECTORS: { [key: string]: true } = {
	_hover: true,
	_pressed: true,
	_focus: true,
	_focusVisible: true,
	_disabled: true,
	_selected: true,
	_checked: true,
	_loading: true,
	_first: true,
	_last: true,
	_odd: true,
	_even: true,
};

const SHORTHAND: { [key: string]: true } = {
	width: true,
	height: true,
	w: true,
	h: true,
	size: true,
	x: true,
	y: true,
	position: true,
	pos: true,
	anchor: true,
	p: true,
	px: true,
	py: true,
	pt: true,
	pr: true,
	pb: true,
	pl: true,
	padding: true,
	gap: true,
	bgcolor: true,
	bg: true,
	backgroundColor: true,
	color: true,
	borderColor: true,
	opacity: true,
	transparency: true,
	border: true,
	borderWidth: true,
	radius: true,
	typography: true,
	fontSize: true,
	font: true,
	visible: true,
	zIndex: true,
	z: true,
	gradient: true,
};

export type SxColor = PaletteToken | Color3;

/** Color stops on a UIGradient child. Times default to even spacing. */
export interface SxGradient {
	colors: SxColor[];
	rotation?: number;
	times?: number[];
	transparency?: number | NumberSequence;
	offset?: Vector2;
}

/** CSS-like shorthands + pass-through Instance props. No CSS string parser. */
export type SxInput = {
	width?: Responsive<number | UDim | UDim2>;
	height?: Responsive<number | UDim | UDim2>;
	w?: Responsive<number | UDim | UDim2>;
	h?: Responsive<number | UDim | UDim2>;
	size?: Responsive<UDim2 | { width?: number | UDim; height?: number | UDim }>;
	x?: Responsive<number | UDim>;
	y?: Responsive<number | UDim>;
	position?: Responsive<UDim2>;
	pos?: Responsive<UDim2>;
	anchor?: Responsive<Vector2 | number | [number, number]>;
	p?: Responsive<number>;
	px?: Responsive<number>;
	py?: Responsive<number>;
	pt?: Responsive<number>;
	pr?: Responsive<number>;
	pb?: Responsive<number>;
	pl?: Responsive<number>;
	padding?: Responsive<PadInput>;
	gap?: Responsive<number>;
	bgcolor?: Responsive<SxColor>;
	bg?: Responsive<SxColor>;
	backgroundColor?: Responsive<SxColor>;
	color?: Responsive<SxColor>;
	borderColor?: Responsive<SxColor>;
	opacity?: Responsive<number>;
	transparency?: Responsive<number>;
	border?: Responsive<number>;
	borderWidth?: Responsive<number>;
	radius?: Responsive<number>;
	typography?: Responsive<string>;
	fontSize?: Responsive<number>;
	font?: Responsive<Enum.Font | string>;
	visible?: Responsive<boolean>;
	zIndex?: Responsive<number>;
	z?: Responsive<number>;
	gradient?: Responsive<SxGradient>;
	_hover?: SxInput;
	_pressed?: SxInput;
	_focus?: SxInput;
	_focusVisible?: SxInput;
	_disabled?: SxInput;
	_selected?: SxInput;
	_checked?: SxInput;
	_loading?: SxInput;
	_first?: SxInput;
	_last?: SxInput;
	_odd?: SxInput;
	_even?: SxInput;
	[key: string]: unknown;
};

export interface ResolvedSx {
	root: { [key: string]: unknown };
	padding?: {
		PaddingTop: UDim;
		PaddingRight: UDim;
		PaddingBottom: UDim;
		PaddingLeft: UDim;
	};
	corner?: { CornerRadius: UDim };
	gap?: number;
	gradient?: { Color: ColorSequence; Rotation: number; Transparency?: NumberSequence; Offset?: Vector2 };
}

function gradientTransparency(value: number | NumberSequence | undefined) {
	if (value === undefined) return undefined;
	if (typeIs(value, "number")) return new NumberSequence(value);
	return value;
}

function pick<T>(value: Responsive<T> | undefined, width?: number): T | undefined {
	if (value === undefined) return undefined;
	if (width !== undefined) return resolveResponsive(value, width);
	if (typeOf(value) !== "table") return value as T;
	const record = value as { phone?: T; tablet?: T; desktop?: T };
	if (record.phone !== undefined || record.tablet !== undefined || record.desktop !== undefined) {
		return record.desktop ?? record.tablet ?? record.phone;
	}
	return value as T;
}

function asUDim(value: number | UDim): UDim {
	return typeIs(value, "number") ? new UDim(0, value) : (value as UDim);
}

function sizeAxis(value: number | UDim | UDim2 | undefined, axis: "X" | "Y"): UDim | undefined {
	if (value === undefined) return undefined;
	if (typeIs(value, "number")) return new UDim(0, value);
	if (typeIs(value, "UDim")) return value;
	return axis === "X" ? (value as UDim2).X : (value as UDim2).Y;
}

function padSides(padding?: PadInput): PadSides {
	if (padding === undefined) return { top: 0, right: 0, bottom: 0, left: 0 };
	if (typeIs(padding, "number")) {
		return { top: padding, right: padding, bottom: padding, left: padding };
	}
	const x = padding.x ?? 0;
	const y = padding.y ?? 0;
	return {
		top: padding.top ?? y,
		right: padding.right ?? x,
		bottom: padding.bottom ?? y,
		left: padding.left ?? x,
	};
}

function colorOf(theme: SxTheme, value: SxColor | undefined): Color3 | undefined {
	if (value === undefined) return undefined;
	return resolvePaletteToken(theme.palette, value);
}

/**
 * Maps sx shorthands / tokens → Instance props (+ UIPadding / UICorner / gap helpers).
 * Pass-through keys (BackgroundColor3, _hover, …) stay on `root` for `resolveStyle`.
 */
export function resolveSx(theme: SxTheme, sx?: SxInput, width?: number): ResolvedSx {
	if (sx === undefined) return { root: {} };

	const root: { [key: string]: unknown } = {};
	let pad: PadSides | undefined;
	let radius: number | undefined;
	let gap: number | undefined;

	const widthVal = pick(sx.width ?? sx.w, width);
	const heightVal = pick(sx.height ?? sx.h, width);
	const sizeVal = pick(sx.size, width);
	let sizeX = sizeAxis(widthVal, "X");
	let sizeY = sizeAxis(heightVal, "Y");
	if (sizeVal !== undefined) {
		if (typeIs(sizeVal, "UDim2")) {
			sizeX = sizeX ?? sizeVal.X;
			sizeY = sizeY ?? sizeVal.Y;
		} else {
			const record = sizeVal as { width?: number | UDim; height?: number | UDim };
			sizeX = sizeX ?? sizeAxis(record.width, "X");
			sizeY = sizeY ?? sizeAxis(record.height, "Y");
		}
	}
	if (sizeX !== undefined || sizeY !== undefined) {
		root.Size = new UDim2(
			sizeX?.Scale ?? 0,
			sizeX?.Offset ?? 0,
			sizeY?.Scale ?? 0,
			sizeY?.Offset ?? 0,
		);
	}

	const position = pick(sx.position ?? sx.pos, width);
	const x = pick(sx.x, width);
	const y = pick(sx.y, width);
	if (position !== undefined) {
		root.Position = position;
	} else if (x !== undefined || y !== undefined) {
		const xU = x !== undefined ? asUDim(x) : new UDim(0, 0);
		const yU = y !== undefined ? asUDim(y) : new UDim(0, 0);
		root.Position = new UDim2(xU.Scale, xU.Offset, yU.Scale, yU.Offset);
	}

	const anchor = pick(sx.anchor, width);
	if (anchor !== undefined) {
		if (typeIs(anchor, "number")) {
			root.AnchorPoint = new Vector2(anchor, anchor);
		} else if (typeIs(anchor, "Vector2")) {
			root.AnchorPoint = anchor;
		} else {
			const pair = anchor as [number, number];
			root.AnchorPoint = new Vector2(pair[0], pair[1]);
		}
	}

	const padding = pick(sx.padding, width);
	if (padding !== undefined) pad = padSides(padding);
	const p = pick(sx.p, width);
	const px = pick(sx.px, width);
	const py = pick(sx.py, width);
	const pt = pick(sx.pt, width);
	const pr = pick(sx.pr, width);
	const pb = pick(sx.pb, width);
	const pl = pick(sx.pl, width);
	if (
		p !== undefined ||
		px !== undefined ||
		py !== undefined ||
		pt !== undefined ||
		pr !== undefined ||
		pb !== undefined ||
		pl !== undefined
	) {
		const base = pad ?? { top: 0, right: 0, bottom: 0, left: 0 };
		const uniform = p ?? 0;
		pad = {
			top: pt ?? py ?? (p !== undefined ? uniform : base.top),
			right: pr ?? px ?? (p !== undefined ? uniform : base.right),
			bottom: pb ?? py ?? (p !== undefined ? uniform : base.bottom),
			left: pl ?? px ?? (p !== undefined ? uniform : base.left),
		};
	}

	const gapVal = pick(sx.gap, width);
	if (gapVal !== undefined) gap = theme.spacing.calc(gapVal);

	const bg = pick(sx.bgcolor ?? sx.bg ?? sx.backgroundColor, width);
	const bgColor = colorOf(theme, bg);
	if (bgColor !== undefined) {
		root.BackgroundColor3 = bgColor;
		if (root.BackgroundTransparency === undefined) root.BackgroundTransparency = 0;
	}

	const textColor = colorOf(theme, pick(sx.color, width));
	if (textColor !== undefined) root.TextColor3 = textColor;

	const borderColor = colorOf(theme, pick(sx.borderColor, width));
	if (borderColor !== undefined) root.BorderColor3 = borderColor;

	const opacity = pick(sx.opacity, width);
	if (opacity !== undefined) root.BackgroundTransparency = 1 - opacity;

	const transparency = pick(sx.transparency, width);
	if (transparency !== undefined) root.BackgroundTransparency = transparency;

	const border = pick(sx.border ?? sx.borderWidth, width);
	if (border !== undefined) root.BorderSizePixel = border;

	const radiusVal = pick(sx.radius, width);
	if (radiusVal !== undefined) radius = radiusVal;

	const typography = pick(sx.typography, width);
	if (typography !== undefined) {
		const variant = theme.typography.variants[typography];
		if (variant !== undefined) {
			root.TextSize = variant.size;
			root.Font = theme.typography.fontFamilies[variant.family];
		}
	}

	const fontSize = pick(sx.fontSize, width);
	if (fontSize !== undefined) root.TextSize = fontSize;

	const font = pick(sx.font, width);
	if (font !== undefined) {
		if (typeIs(font, "EnumItem")) {
			root.Font = font;
		} else {
			root.Font = theme.typography.fontFamilies[font as string];
		}
	}

	const visible = pick(sx.visible, width);
	if (visible !== undefined) root.Visible = visible;

	const zIndex = pick(sx.zIndex ?? sx.z, width);
	if (zIndex !== undefined) root.ZIndex = zIndex;

	const gradientVal = pick(sx.gradient, width);
	let gradient: ResolvedSx["gradient"];
	if (gradientVal !== undefined && gradientVal.colors.size() > 0) {
		const stops = gradientVal.colors.map((token) => resolvePaletteToken(theme.palette, token));
		const count = stops.size();
		const last = math.max(count - 1, 1);
		const times = gradientVal.times;
		const keypoints = new Array<ColorSequenceKeypoint>();
		let previous = 0;
		for (let index = 0; index < count; index++) {
			let time = count === 1 ? 0 : index / last;
			if (times !== undefined && count > 1 && times[index] !== undefined) {
				if (index === 0) time = 0;
				else if (index === count - 1) time = 1;
				else time = math.clamp(times[index], previous, 1);
			}
			if (time < previous) time = previous;
			previous = time;
			keypoints.push(new ColorSequenceKeypoint(time, stops[index]));
		}
		if (count === 1) keypoints.push(new ColorSequenceKeypoint(1, stops[0]));
		const transparency = gradientTransparency(gradientVal.transparency);
		gradient = { Color: new ColorSequence(keypoints), Rotation: gradientVal.rotation ?? 0 };
		if (transparency !== undefined) gradient.Transparency = transparency;
		if (gradientVal.offset !== undefined) gradient.Offset = gradientVal.offset;
	}

	for (const [key, raw] of pairs(sx as object)) {
		const name = key as string;
		if (SHORTHAND[name] === true) continue;
		if (SELECTORS[name] === true) {
			const nested = resolveSx(theme, raw as SxInput, width);
			root[name] = nested.root;
			continue;
		}
		root[name] = pick(raw as Responsive<unknown>, width);
	}

	const resolved: ResolvedSx = { root };
	if (pad !== undefined) {
		resolved.padding = {
			PaddingTop: new UDim(0, theme.spacing.calc(pad.top)),
			PaddingRight: new UDim(0, theme.spacing.calc(pad.right)),
			PaddingBottom: new UDim(0, theme.spacing.calc(pad.bottom)),
			PaddingLeft: new UDim(0, theme.spacing.calc(pad.left)),
		};
	}
	if (radius !== undefined) {
		resolved.corner = { CornerRadius: new UDim(0, radius) };
	}
	if (gap !== undefined) resolved.gap = gap;
	if (gradient !== undefined) resolved.gradient = gradient;
	return resolved;
}
