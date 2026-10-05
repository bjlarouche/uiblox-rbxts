globalThis.typeOf = (value) => (typeof value === "object" && value !== null ? "table" : typeof value);
globalThis.pairs = (record) => Object.keys(record).map((key) => [key, record[key]]);
globalThis.tostring = (value) => String(value);

const { applyVariants } = await import("../src/theme/styles/utilities/variants.ts");

const slots = applyVariants(
	{ root: { BackgroundTransparency: 0, Text: "base" } },
	{ size: "small", color: "primary" },
	{
		size: { small: { root: { Text: "small" } } },
		color: { primary: { root: { BackgroundTransparency: 1 } } },
	},
	[{ when: { size: "small", color: "primary" }, styles: { root: { Text: "compound" } } }],
);
if (slots.root.Text !== "compound" || slots.root.BackgroundTransparency !== 1) {
	throw new Error(`spread ${slots.root.Text} ${slots.root.BackgroundTransparency}`);
}
if (slots.root === undefined) throw new Error("missing root");

const skipped = applyVariants(
	{ root: { Text: "base" } },
	{ size: "large" },
	{ size: { small: { root: { Text: "small" } } } },
	[{ when: { size: "small" }, styles: { root: { Text: "compound" } } }],
);
if (skipped.root.Text !== "base") throw new Error("unmatched variant");

console.log("style variants ok");
