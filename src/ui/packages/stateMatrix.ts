export type StateTheme = "Dark" | "Light";
export type StatePointer = "rest" | "hover" | "press" | "focus";

export interface StateCapture {
	component: string;
	name: string;
	theme: StateTheme;
	width: number;
	pointer: StatePointer;
	text: string;
	disabled?: boolean;
	loading?: boolean;
	value?: string | number | boolean;
	mixed?: boolean;
	hasError?: boolean;
	placeholder?: string;
	open?: boolean;
	selected?: string;
	filter?: string;
	options?: string[];
	disabledOption?: string;
}

const LONG = "Save changes to this story before publishing the preview";
const WIDE = 280;
const NARROW = 120;

function pair(component: string, name: string, patch: Partial<StateCapture> = {}): StateCapture[] {
	return (["Dark", "Light"] as const).map((theme) => ({
		component,
		name: `${component}-${name}-${theme === "Dark" ? "dark" : "light"}`,
		theme,
		width: WIDE,
		pointer: "rest" as const,
		text: "Continue",
		...patch,
	}));
}

export const stateMatrix: StateCapture[] = [
	...pair("Button", "default"),
	...pair("Button", "hover", { pointer: "hover" }),
	...pair("Button", "press", { pointer: "press" }),
	...pair("Button", "focus", { pointer: "focus" }),
	...pair("Button", "disabled", { disabled: true }),
	...pair("Button", "loading", { loading: true }),
	...pair("Button", "long", { text: LONG, width: NARROW }),

	...pair("Input", "default", { text: "Story" }),
	...pair("Input", "focus", { text: "Story", pointer: "focus" }),
	...pair("Input", "disabled", { text: "Story", disabled: true }),
	...pair("Input", "error", { text: "Story", hasError: true }),
	...pair("Input", "placeholder", { text: "", placeholder: "Search stories" }),
	...pair("Input", "long", { text: LONG, width: NARROW }),

	...pair("Checkbox", "unchecked"),
	...pair("Checkbox", "checked", { value: true }),
	...pair("Checkbox", "mixed", { mixed: true }),
	...pair("Checkbox", "disabled", { disabled: true }),
	...pair("Checkbox", "hover", { pointer: "hover" }),
	...pair("Checkbox", "press", { pointer: "press" }),
	...pair("Checkbox", "focus", { pointer: "focus" }),
	...pair("Checkbox", "long", { text: LONG, width: NARROW }),

	...pair("Switch", "off"),
	...pair("Switch", "on", { value: true }),
	...pair("Switch", "disabled", { disabled: true }),
	...pair("Switch", "hover", { pointer: "hover" }),
	...pair("Switch", "press", { pointer: "press" }),
	...pair("Switch", "focus", { pointer: "focus" }),
	...pair("Switch", "long", { text: LONG, width: NARROW }),

	...pair("RadioGroup", "default", { value: "Continue", options: ["Continue", "Other"] }),
	...pair("RadioGroup", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true }),
	...pair("RadioGroup", "disabled-option", {
		value: "Continue",
		options: ["Continue", "Other"],
		disabledOption: "Other",
	}),
	...pair("RadioGroup", "hover", { value: "Continue", options: ["Continue", "Other"], pointer: "hover" }),
	...pair("RadioGroup", "long", { value: LONG, options: [LONG, "Other"], text: LONG, width: NARROW }),

	...pair("Select", "default", { value: "Continue", options: ["Continue", "Other"] }),
	...pair("Select", "open", { value: "Continue", options: ["Continue", "Other"], open: true }),
	...pair("Select", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true }),
	...pair("Select", "hover", { value: "Continue", options: ["Continue", "Other"], open: true, pointer: "hover" }),
	...pair("Select", "press", { value: "Continue", options: ["Continue", "Other"], pointer: "press" }),
	...pair("Select", "long", { value: LONG, options: [LONG, "Other"], text: LONG, width: NARROW, open: true }),

	...pair("Tabs", "default", { value: "Continue", options: ["Continue", "Docs", "Actions"] }),
	...pair("Tabs", "disabled", { value: "Continue", options: ["Continue", "Docs", "Actions"], disabled: true }),
	...pair("Tabs", "hover", { value: "Continue", options: ["Continue", "Docs", "Actions"], pointer: "hover" }),
	...pair("Tabs", "long", {
		value: LONG,
		options: [LONG, "Docs", "Actions", "Source", "Settings"],
		text: LONG,
		width: NARROW,
	}),

	...pair("SplitPane", "default", { value: 160 }),
	...pair("SplitPane", "disabled", { value: 160, disabled: true }),
	...pair("SplitPane", "hover", { value: 160, pointer: "hover" }),
	...pair("SplitPane", "drag", { value: 160, pointer: "press" }),
	...pair("SplitPane", "long", { value: 80, text: LONG, width: NARROW }),

	...pair("Tooltip", "hidden"),
	...pair("Tooltip", "shown", { pointer: "hover" }),
	...pair("Tooltip", "long", { text: LONG, width: NARROW, pointer: "hover" }),

	...pair("TreeView", "default", { selected: "Fixture/Styled" }),
	...pair("TreeView", "hover", { selected: "Fixture/Styled", pointer: "hover" }),
	...pair("TreeView", "filter", { selected: "Fixture/Styled", filter: "sty" }),
	...pair("TreeView", "long", { selected: `Fixture/${LONG}`, text: LONG, width: NARROW }),
];
