export type StateTheme = "Dark" | "Light";
export type StatePointer = "rest" | "hover" | "press" | "focus";
export type StateSize = "small" | "medium" | "large";
export type StateDensity = "compact" | "comfortable";

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
	variant?: string;
	animation?: "pulse" | "shimmer" | false;
	reducedMotion?: boolean;
	indeterminate?: boolean;
	size?: StateSize;
	density?: StateDensity;
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
	...pair("Button", "size-small", { size: "small" }),
	...pair("Button", "size-medium", { size: "medium" }),
	...pair("Button", "size-large", { size: "large" }),
	...pair("Button", "density-compact", { density: "compact", size: "small" }),
	...pair("Button", "hover", { pointer: "hover" }),
	...pair("Button", "press", { pointer: "press" }),
	...pair("Button", "focus", { pointer: "focus" }),
	...pair("Button", "disabled", { disabled: true }),
	...pair("Button", "loading", { loading: true }),
	...pair("Button", "loading-disabled", { loading: true, disabled: true }),
	...pair("Button", "loading-reduced", { loading: true, reducedMotion: true }),
	...pair("Button", "outlined-loading", { loading: true, variant: "outlined" }),
	...pair("Button", "text-loading", { loading: true, variant: "text" }),
	...pair("Button", "long", { text: LONG, width: NARROW }),

	...pair("Input", "default", { text: "Story" }),
	...pair("Input", "size-small", { text: "Story", size: "small" }),
	...pair("Input", "size-medium", { text: "Story", size: "medium" }),
	...pair("Input", "size-large", { text: "Story", size: "large" }),
	...pair("Input", "density-compact", { text: "Story", density: "compact", size: "small" }),
	...pair("Input", "focus", { text: "Story", pointer: "focus" }),
	...pair("Input", "disabled", { text: "Story", disabled: true }),
	...pair("Input", "error", { text: "Story", hasError: true }),
	...pair("Input", "placeholder", { text: "", placeholder: "Search stories" }),
	...pair("Input", "long", { text: LONG, width: NARROW }),

	...pair("Checkbox", "unchecked"),
	...pair("Checkbox", "size-small", { size: "small" }),
	...pair("Checkbox", "size-medium", { size: "medium" }),
	...pair("Checkbox", "size-large", { size: "large" }),
	...pair("Checkbox", "density-compact", { density: "compact", size: "small" }),
	...pair("Checkbox", "checked", { value: true }),
	...pair("Checkbox", "mixed", { mixed: true }),
	...pair("Checkbox", "disabled", { disabled: true }),
	...pair("Checkbox", "disabled-checked", { value: true, disabled: true }),
	...pair("Checkbox", "hover", { pointer: "hover" }),
	...pair("Checkbox", "press", { pointer: "press" }),
	...pair("Checkbox", "focus", { pointer: "focus" }),
	...pair("Checkbox", "checked-press", { value: true, pointer: "press" }),
	...pair("Checkbox", "checked-focus", { value: true, pointer: "focus" }),
	...pair("Checkbox", "long", { text: LONG, width: NARROW }),

	...pair("ColorPicker", "default", { value: "#336699" }),
	...pair("ColorPicker", "open", { value: "#336699", open: true }),
	...pair("ColorPicker", "focus", { value: "#336699", pointer: "focus" }),
	...pair("ColorPicker", "disabled", { value: "#336699", disabled: true }),
	...pair("ColorPicker", "error", { value: "#336699", hasError: true }),
	...pair("ColorPicker", "long", { value: "#336699", text: LONG, width: NARROW }),

	...pair("VectorEditor", "default", { value: "1,2" }),
	...pair("VectorEditor", "disabled", { value: "1,2,3", disabled: true }),
	...pair("VectorEditor", "long", { value: "1,2", text: LONG, width: NARROW }),

	...pair("UDimEditor", "default", { value: "0.5,8" }),
	...pair("UDimEditor", "disabled", { value: "0.5,8", disabled: true }),
	...pair("UDimEditor", "long", { value: "0.5,8", text: LONG, width: NARROW }),

	...pair("Switch", "off"),
	...pair("Switch", "size-small", { size: "small" }),
	...pair("Switch", "size-medium", { size: "medium" }),
	...pair("Switch", "size-large", { size: "large" }),
	...pair("Switch", "density-compact", { density: "compact", size: "small" }),
	...pair("Switch", "on", { value: true }),
	...pair("Switch", "disabled", { disabled: true }),
	...pair("Switch", "disabled-on", { value: true, disabled: true }),
	...pair("Switch", "hover", { pointer: "hover" }),
	...pair("Switch", "press", { pointer: "press" }),
	...pair("Switch", "focus", { pointer: "focus" }),
	...pair("Switch", "on-hover", { value: true, pointer: "hover" }),
	...pair("Switch", "on-press", { value: true, pointer: "press" }),
	...pair("Switch", "on-focus", { value: true, pointer: "focus" }),
	...pair("Switch", "reduced", { value: true, reducedMotion: true }),
	...pair("Switch", "long", { text: LONG, width: NARROW }),

	...pair("Slider", "default", { value: 0.5 }),
	...pair("Slider", "size-small", { value: 0.5, size: "small" }),
	...pair("Slider", "size-medium", { value: 0.5, size: "medium" }),
	...pair("Slider", "size-large", { value: 0.5, size: "large" }),
	...pair("Slider", "density-compact", { value: 0.5, density: "compact", size: "small" }),
	...pair("Slider", "disabled", { value: 0.5, disabled: true }),
	...pair("Slider", "hover", { value: 0.5, pointer: "hover" }),
	...pair("Slider", "press", { value: 0.5, pointer: "press" }),
	...pair("Slider", "focus", { value: 0.5, pointer: "focus" }),
	...pair("Slider", "long", { value: 0.25, text: LONG, width: NARROW }),

	...pair("RadioGroup", "default", { value: "Continue", options: ["Continue", "Other"] }),
	...pair("RadioGroup", "size-small", { value: "Continue", options: ["Continue", "Other"], size: "small" }),
	...pair("RadioGroup", "size-large", { value: "Continue", options: ["Continue", "Other"], size: "large" }),
	...pair("RadioGroup", "density-compact", { value: "Continue", options: ["Continue", "Other"], density: "compact", size: "small" }),
	...pair("RadioGroup", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true }),
	...pair("RadioGroup", "disabled-option", {
		value: "Continue",
		options: ["Continue", "Other"],
		disabledOption: "Other",
	}),
	...pair("RadioGroup", "hover", { value: "Continue", options: ["Continue", "Other"], pointer: "hover" }),
	...pair("RadioGroup", "long", { value: LONG, options: [LONG, "Other"], text: LONG, width: NARROW }),

	...pair("Select", "default", { value: "Continue", options: ["Continue", "Other"] }),
	...pair("Select", "size-small", { value: "Continue", options: ["Continue", "Other"], size: "small" }),
	...pair("Select", "size-large", { value: "Continue", options: ["Continue", "Other"], size: "large" }),
	...pair("Select", "density-compact", { value: "Continue", options: ["Continue", "Other"], density: "compact", size: "small" }),
	...pair("Select", "open", { value: "Continue", options: ["Continue", "Other"], open: true }),
	...pair("Select", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true }),
	...pair("Select", "hover", { value: "Continue", options: ["Continue", "Other"], open: true, pointer: "hover" }),
	...pair("Select", "press", { value: "Continue", options: ["Continue", "Other"], pointer: "press" }),
	...pair("Select", "long", { value: LONG, options: [LONG, "Other"], text: LONG, width: NARROW, open: true }),
	...pair("Select", "search", {
		value: "Continue",
		options: ["Continue", "Other", "Docs", "Actions", "Source", "Settings", "Theme", "Inspector", "Controls"],
		open: true,
		filter: "con",
	}),

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

	...pair("IconButton", "loading", { loading: true }),
	...pair("IconButton", "loading-disabled", { loading: true, disabled: true }),
	...pair("IconButton", "loading-reduced", { loading: true, reducedMotion: true }),

	...pair("Skeleton", "text", { variant: "text", animation: "pulse" }),
	...pair("Skeleton", "text-static", { variant: "text", animation: false }),
	...pair("Skeleton", "text-reduced", { variant: "text", animation: "shimmer", reducedMotion: true }),
	...pair("Skeleton", "rectangular", { variant: "rectangular", animation: false }),
	...pair("Skeleton", "rounded", { variant: "rounded", animation: "pulse" }),
	...pair("Skeleton", "circular", { variant: "circular", animation: false }),
	...pair("Skeleton", "shimmer", { variant: "rounded", animation: "shimmer" }),

	...pair("CircularProgress", "empty", { value: 0 }),
	...pair("CircularProgress", "half", { value: 0.5 }),
	...pair("CircularProgress", "full", { value: 1 }),
	...pair("CircularProgress", "indeterminate", { indeterminate: true }),
	...pair("CircularProgress", "reduced", { indeterminate: true, reducedMotion: true }),
	...pair("CircularProgress", "disabled", { value: 0.4, disabled: true }),

	...pair("LinearProgress", "empty", { value: 0 }),
	...pair("LinearProgress", "half", { value: 0.5 }),
	...pair("LinearProgress", "full", { value: 1 }),
	...pair("LinearProgress", "indeterminate", { indeterminate: true }),
	...pair("LinearProgress", "reduced", { indeterminate: true, reducedMotion: true }),
	...pair("LinearProgress", "disabled", { value: 0.6, disabled: true }),

	...pair("Dialog", "closed", { open: false }),
	...pair("Dialog", "open", { open: true }),

	...pair("Paper", "flat", { variant: "flat" }),
	...pair("Paper", "raised", { variant: "raised" }),

	...pair("ListItem", "default"),
	...pair("ListItem", "selected", { value: true }),
	...pair("ListItem", "disabled", { disabled: true }),
	...pair("ListItem", "secondary", { variant: "secondary" }),

	...pair("Card", "flat", { variant: "flat" }),
	...pair("Card", "raised", { variant: "raised" }),

	...pair("Chip", "default"),
	...pair("Chip", "selected", { value: true }),
	...pair("Chip", "disabled", { disabled: true }),

	...pair("Badge", "count", { value: 3 }),
	...pair("Badge", "max", { value: 100 }),
	...pair("Badge", "invisible", { value: 0 }),

	...pair("Avatar", "initials", { text: "BL" }),
	...pair("Avatar", "image", { variant: "image" }),
	...pair("Avatar", "small", { size: "small" }),

	...pair("Drawer", "closed", { open: false }),
	...pair("Drawer", "left", { open: true, variant: "left" }),
	...pair("Drawer", "right", { open: true, variant: "right" }),

	...pair("Breadcrumbs", "single", { text: "Home" }),
	...pair("Breadcrumbs", "trail", { text: "Home / Library / Item" }),
	...pair("Breadcrumbs", "custom-separator", { text: "Home > Item" }),

	...pair("Pagination", "first", { value: 1 }),
	...pair("Pagination", "middle", { value: 3 }),
	...pair("Pagination", "disabled", { value: 2, disabled: true }),

	...pair("Stepper", "first", { value: 0 }),
	...pair("Stepper", "middle", { value: 1 }),
	...pair("Stepper", "last", { value: 2 }),

	...pair("Accordion", "closed", { open: false }),
	...pair("Accordion", "open", { open: true }),

	...pair("Snackbar", "open", { open: true, text: "Saved" }),
	...pair("Snackbar", "closed", { open: false, text: "Saved" }),

	...pair("Table", "empty", { text: "" }),
	...pair("Table", "default", { text: "Name / Role" }),
	...pair("Table", "selected", { text: "Name / Role", value: 0 }),

	...pair("Menu", "closed", { open: false }),
	...pair("Menu", "open", { open: true }),
];

