globalThis.typeOf = (value) => {
	if (value instanceof globalThis.Color3) return "Color3";
	if (value instanceof globalThis.UDim) return "UDim";
	if (value instanceof globalThis.UDim2) return "UDim2";
	if (value instanceof globalThis.Vector2) return "Vector2";
	if (typeof value === "object" && value !== null) return "table";
	return typeof value;
};
globalThis.typeIs = (value, typeName) => {
	if (typeName === "string") return typeof value === "string";
	if (typeName === "number") return typeof value === "number";
	if (typeName === "Color3") return value instanceof globalThis.Color3;
	if (typeName === "UDim") return value instanceof globalThis.UDim;
	if (typeName === "UDim2") return value instanceof globalThis.UDim2;
	if (typeName === "Vector2") return value instanceof globalThis.Vector2;
	if (typeName === "EnumItem") return value?.__enum === true;
	if (typeName === "table") return typeof value === "object" && value !== null;
	return false;
};
globalThis.pairs = (record) => Object.keys(record).map((key) => [key, record[key]]);
globalThis.tostring = (value) => String(value);
globalThis.math = { huge: Infinity };
globalThis.Color3 = class Color3 {
	constructor(r = 0, g = 0, b = 0) {
		this.R = r;
		this.G = g;
		this.B = b;
	}
	static fromRGB(r, g, b) {
		return new Color3(r / 255, g / 255, b / 255);
	}
};
globalThis.Vector2 = class Vector2 {
	constructor(x = 0, y = 0) {
		this.X = x;
		this.Y = y;
	}
};
globalThis.UDim = class UDim {
	constructor(scale = 0, offset = 0) {
		this.Scale = scale;
		this.Offset = offset;
	}
};
globalThis.ColorSequenceKeypoint = class ColorSequenceKeypoint {
	constructor(time, value) {
		this.Time = time;
		this.Value = value;
	}
};
globalThis.ColorSequence = class ColorSequence {
	constructor(keypoints) {
		this.Keypoints = keypoints;
	}
};
globalThis.math.max = Math.max;
Array.prototype.size = function size() {
	return this.length;
};
globalThis.UDim2 = class UDim2 {
	constructor(xScale = 0, xOffset = 0, yScale = 0, yOffset = 0) {
		this.X = new UDim(xScale, xOffset);
		this.Y = new UDim(yScale, yOffset);
	}
};

const paper = new Color3(0.9, 0.9, 0.9);
const primary = new Color3(0.2, 0.4, 0.8);
const hover = new Color3(0.3, 0.3, 0.3);
const theme = {
	spacing: { default: 8, calc: (n) => 8 * n },
	palette: {
		surface: { paper },
		primary: { main: primary },
		action: { hover },
		text: { primary: new Color3(0, 0, 0) },
	},
	typography: {
		fontFamilies: { default: { __enum: true, Name: "SourceSans" }, semibold: { __enum: true, Name: "SourceSansSemibold" } },
		variants: {
			body: { size: 14, family: "default", weight: 400 },
			button: { size: 13, family: "semibold", weight: 600 },
		},
	},
};

const { resolveSx } = await import("../src/theme/styles/utilities/resolveSx.ts");
const { resolveStyle } = await import("../src/theme/styles/utilities/resolveStyle.ts");
const { cx } = await import("../src/theme/styles/utilities/classNames.ts");

const painted = resolveSx(theme, {
	width: 100,
	height: 40,
	anchor: 0.5,
	p: 2,
	px: 3,
	bgcolor: "surface.paper",
	color: "primary.main",
	border: 1,
	radius: 4,
	gap: 1,
	typography: "button",
	visible: true,
	z: 2,
	_hover: { bgcolor: "action.hover" },
});

if (painted.root.Size.X.Offset !== 100 || painted.root.Size.Y.Offset !== 40) throw new Error("size");
if (painted.root.AnchorPoint.X !== 0.5 || painted.root.AnchorPoint.Y !== 0.5) throw new Error("anchor");
if (painted.root.BackgroundColor3 !== paper) throw new Error("bg");
if (painted.root.TextColor3 !== primary) throw new Error("color");
if (painted.root.BorderSizePixel !== 1) throw new Error("border");
if (painted.root.TextSize !== 13) throw new Error("typography size");
if (painted.root.Visible !== true || painted.root.ZIndex !== 2) throw new Error("visible/z");
if (painted.padding.PaddingTop.Offset !== 16 || painted.padding.PaddingLeft.Offset !== 24) {
	throw new Error(`pad ${painted.padding.PaddingTop.Offset} ${painted.padding.PaddingLeft.Offset}`);
}
if (painted.corner.CornerRadius.Offset !== 4) throw new Error("radius");
if (painted.gap !== 8) throw new Error("gap");
if (painted.root._hover.BackgroundColor3 !== hover) throw new Error("hover shorthand");

const faded = resolveSx(theme, { opacity: 0.5 });
if (faded.root.BackgroundTransparency !== 0.5) throw new Error("opacity");
const nativeWins = resolveSx(theme, { opacity: 0.5, BackgroundTransparency: 0.25 });
if (nativeWins.root.BackgroundTransparency !== 0.25) throw new Error("native over shorthand");

const viaStyle = resolveStyle(painted.root, { hover: true });
if (viaStyle.BackgroundColor3 !== hover) throw new Error("resolveStyle after sx");

const responsive = resolveSx(
	theme,
	{ width: { phone: 80, tablet: 120, desktop: 200 }, bgcolor: { phone: "primary.main", desktop: "surface.paper" } },
	500,
);
if (responsive.root.Size.X.Offset !== 80) throw new Error("phone width");
if (responsive.root.BackgroundColor3 !== primary) throw new Error("phone color");

const wide = resolveSx(theme, { width: { phone: 80, desktop: 200 } }, 1000);
if (wide.root.Size.X.Offset !== 200) throw new Error("desktop width");

const className = { Text: "a", BackgroundTransparency: 0 };
const merged = cx(className, resolveSx(theme, { bgcolor: "surface.paper", Text: "b" }).root);
if (merged.Text !== "b" || merged.BackgroundColor3 !== paper || merged.BackgroundTransparency !== 0) {
	throw new Error("cx precedence");
}

const shaded = resolveSx(theme, { gradient: { colors: ["primary.main", "surface.paper", hover], rotation: 90 } });
const stops = shaded.gradient?.Color.Keypoints ?? [];
if (stops.length !== 3 || stops[0].Value !== primary || stops[1].Time !== 0.5 || stops[2].Value !== hover) throw new Error("gradient stops");
if (shaded.gradient.Rotation !== 90 || shaded.root.gradient !== undefined) throw new Error("gradient rotation/root");
const solid = resolveSx(theme, { gradient: { colors: ["surface.paper"] } });
if (solid.gradient.Color.Keypoints.length !== 2 || solid.gradient.Color.Keypoints[1].Time !== 1) throw new Error("single stop gradient");
const phoneShade = resolveSx(theme, { gradient: { phone: { colors: [hover] }, desktop: { colors: [paper] } } }, 400);
if (phoneShade.gradient.Color.Keypoints[0].Value !== hover) throw new Error("responsive gradient");

console.log("resolve sx ok");
