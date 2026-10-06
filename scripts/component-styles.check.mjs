globalThis.pairs = (record) => Object.keys(record).map((key) => [key, record[key]]);
globalThis.tostring = (value) => String(value);
Array.prototype.size = function size() {
	return this.length;
};

const { propsWithDefaults, slotsWithOverrides } = await import(
	"../src/theme/styles/utilities/componentTheme.ts"
);
const { applyVariants } = await import("../src/theme/styles/utilities/variants.ts");

const merged = propsWithDefaults({ size: "small", color: "primary" }, { color: "accent", label: undefined });
if (merged.size !== "small" || merged.color !== "accent") throw new Error("defaults lose to caller");
if (merged.label !== undefined) throw new Error("unset stays default");

const slots = slotsWithOverrides(
	{ root: { Text: "base", BackgroundTransparency: 0 } },
	{ root: { Text: "override" } },
);
if (slots.root.Text !== "override" || slots.root.BackgroundTransparency !== 0) throw new Error("override spread");

const themed = applyVariants(
	{ root: { Text: "base" } },
	{ size: "small" },
	{ size: { small: { root: { Text: "variant" } } } },
	[],
);
const overridden = slotsWithOverrides(themed, { root: { Text: "override" } });
if (overridden.root.Text !== "override") throw new Error("overrides beat theme variants");

console.log("component styles ok");
