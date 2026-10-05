const { interactionStyle } = await import("../src/theme/styles/utilities/interaction.ts");

const base = { BackgroundTransparency: 0, Text: "Go" };
const slots = {
	hover: { BackgroundTransparency: 0.1 },
	pressed: { BackgroundTransparency: 0.2 },
	focused: { Text: "Focus" },
	disabled: { Text: "Off", BackgroundTransparency: 0.5 },
};

const hover = interactionStyle(base, slots, { hover: true });
if (hover.BackgroundTransparency !== 0.1 || hover.Text !== "Go") throw new Error("hover");
if (base.BackgroundTransparency !== 0) throw new Error("mutated base");

const stacked = interactionStyle(base, slots, { hover: true, pressed: true, focused: true });
if (stacked.BackgroundTransparency !== 0.2 || stacked.Text !== "Focus") throw new Error("stack");

const disabled = interactionStyle(base, slots, { hover: true, pressed: true, focused: true, disabled: true });
if (disabled.Text !== "Off" || disabled.BackgroundTransparency !== 0.5) throw new Error("disabled wins");

console.log("interaction styles ok");
