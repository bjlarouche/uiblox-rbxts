globalThis.typeOf = (value) => (typeof value === "object" && value !== null ? "table" : typeof value);
globalThis.pairs = (record) => Object.keys(record).map((key) => [key, record[key]]);
globalThis.tostring = (value) => String(value);

const { resolveStyle, interactionStyle } = await import("../src/theme/styles/utilities/resolveStyle.ts");

const style = {
	BackgroundTransparency: 0,
	Text: "Go",
	_hover: { BackgroundTransparency: 0.1 },
	_pressed: { BackgroundTransparency: 0.2 },
	_focus: { Text: "Focus" },
	_selected: { Text: "Pick" },
	_checked: { Text: "On" },
	_first: { LayoutOrder: 0 },
	_last: { LayoutOrder: 99 },
	_disabled: { Text: "Off", BackgroundTransparency: 0.5 },
};

const idle = resolveStyle(style, {});
if (idle.BackgroundTransparency !== 0 || idle.Text !== "Go") throw new Error("idle");
if (idle._hover !== undefined) throw new Error("leaked selector");

const hover = resolveStyle(style, { hover: true });
if (hover.BackgroundTransparency !== 0.1 || hover.Text !== "Go") throw new Error("hover");

const stacked = resolveStyle(style, { hover: true, pressed: true, focused: true });
if (stacked.BackgroundTransparency !== 0.2 || stacked.Text !== "Focus") throw new Error("stack");

const selected = resolveStyle(style, { selected: true });
if (selected.Text !== "Pick") throw new Error("selected");

const checked = resolveStyle(style, { checked: true });
if (checked.Text !== "On") throw new Error("checked");

const first = resolveStyle(style, { first: true });
if (first.LayoutOrder !== 0) throw new Error("first");

const last = resolveStyle(style, { last: true });
if (last.LayoutOrder !== 99) throw new Error("last");

const ends = resolveStyle(style, { first: true, last: true });
if (ends.LayoutOrder !== 99) throw new Error("last wins first");

const hoverOverFirst = resolveStyle(style, { first: true, hover: true });
if (hoverOverFirst.BackgroundTransparency !== 0.1 || hoverOverFirst.LayoutOrder !== 0) {
	throw new Error("hover beats first");
}

const disabled = resolveStyle(style, { hover: true, pressed: true, focused: true, disabled: true });
if (disabled.Text !== "Off" || disabled.BackgroundTransparency !== 0.5) throw new Error("disabled wins");

const viaSlots = interactionStyle(
	{ BackgroundTransparency: 0, Text: "Go" },
	{
		hover: { BackgroundTransparency: 0.1 },
		pressed: { BackgroundTransparency: 0.2 },
		focused: { Text: "Focus" },
		disabled: { Text: "Off", BackgroundTransparency: 0.5 },
	},
	{ hover: true, pressed: true, focused: true, disabled: true },
);
if (viaSlots.Text !== "Off" || viaSlots.BackgroundTransparency !== 0.5) throw new Error("interaction bridge");

if (style.BackgroundTransparency !== 0) throw new Error("mutated style");

console.log("resolve style ok");
