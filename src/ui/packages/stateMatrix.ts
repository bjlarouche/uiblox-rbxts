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
	row?: boolean;
	marks?: boolean;
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

function pushPair(out: StateCapture[], component: string, name: string, patch: Partial<StateCapture> = {}) {
	for (const row of pair(component, name, patch)) {
		out.push(row);
	}
}

function controlsRows(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "Button", "default");
	pushPair(out, "Button", "size-small", { size: "small" });
	pushPair(out, "Button", "size-medium", { size: "medium" });
	pushPair(out, "Button", "size-large", { size: "large" });
	pushPair(out, "Button", "density-compact", { density: "compact", size: "small" });
	pushPair(out, "Button", "hover", { pointer: "hover" });
	pushPair(out, "Button", "press", { pointer: "press" });
	pushPair(out, "Button", "focus", { pointer: "focus" });
	pushPair(out, "Button", "disabled", { disabled: true });
	pushPair(out, "Button", "loading", { loading: true });
	pushPair(out, "Button", "loading-disabled", { loading: true, disabled: true });
	pushPair(out, "Button", "loading-reduced", { loading: true, reducedMotion: true });
	pushPair(out, "Button", "outlined-loading", { loading: true, variant: "outlined" });
	pushPair(out, "Button", "text-loading", { loading: true, variant: "text" });
	pushPair(out, "Button", "long", { text: LONG, width: NARROW });
	pushPair(out, "Button", "sx", { variant: "sx" });
	pushPair(out, "IconButton", "sx", { variant: "sx" });
	pushPair(out, "Input", "default", { text: "Story" });
	pushPair(out, "Input", "size-small", { text: "Story", size: "small" });
	pushPair(out, "Input", "size-medium", { text: "Story", size: "medium" });
	pushPair(out, "Input", "size-large", { text: "Story", size: "large" });
	pushPair(out, "Input", "density-compact", { text: "Story", density: "compact", size: "small" });
	pushPair(out, "Input", "focus", { text: "Story", pointer: "focus" });
	pushPair(out, "Input", "disabled", { text: "Story", disabled: true });
	pushPair(out, "Input", "readonly", { text: "Story" });
	pushPair(out, "Input", "loading", { text: "Story", loading: true });
	pushPair(out, "Input", "loading-reduced", { text: "Story", loading: true, reducedMotion: true });
	pushPair(out, "Input", "error", { text: "Story", hasError: true });
	pushPair(out, "Input", "placeholder", { text: "", placeholder: "Search stories" });
	pushPair(out, "Input", "long", { text: LONG, width: NARROW });
	pushPair(out, "Input", "sx", { variant: "sx" });
	pushPair(out, "Checkbox", "unchecked");
	pushPair(out, "Checkbox", "size-small", { size: "small" });
	pushPair(out, "Checkbox", "size-medium", { size: "medium" });
	pushPair(out, "Checkbox", "size-large", { size: "large" });
	pushPair(out, "Checkbox", "density-compact", { density: "compact", size: "small" });
	pushPair(out, "Checkbox", "checked", { value: true });
	pushPair(out, "Checkbox", "mixed", { mixed: true });
	pushPair(out, "Checkbox", "disabled", { disabled: true });
	return out;
}

function editorsRows(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "Checkbox", "disabled-checked", { value: true, disabled: true });
	pushPair(out, "Checkbox", "hover", { pointer: "hover" });
	pushPair(out, "Checkbox", "press", { pointer: "press" });
	pushPair(out, "Checkbox", "focus", { pointer: "focus" });
	pushPair(out, "Checkbox", "checked-press", { value: true, pointer: "press" });
	pushPair(out, "Checkbox", "checked-focus", { value: true, pointer: "focus" });
	pushPair(out, "Checkbox", "long", { text: LONG, width: NARROW });
	pushPair(out, "Checkbox", "sx", { variant: "sx" });
	pushPair(out, "ColorPicker", "default", { value: "#336699" });
	pushPair(out, "ColorPicker", "open", { value: "#336699", open: true });
	pushPair(out, "ColorPicker", "focus", { value: "#336699", pointer: "focus" });
	pushPair(out, "ColorPicker", "disabled", { value: "#336699", disabled: true });
	pushPair(out, "ColorPicker", "error", { value: "#336699", hasError: true });
	pushPair(out, "ColorPicker", "long", { value: "#336699", text: LONG, width: NARROW });
	pushPair(out, "ColorPicker", "sx", { value: "#336699" });
	pushPair(out, "BrickColorPicker", "default", { value: "Bright red" });
	pushPair(out, "BrickColorPicker", "open", { value: "Bright red", open: true });
	pushPair(out, "BrickColorPicker", "disabled", { value: "Bright red", disabled: true });
	pushPair(out, "BrickColorPicker", "sx", { value: "Bright red" });
	pushPair(out, "VectorEditor", "default", { value: "1,2" });
	pushPair(out, "VectorEditor", "disabled", { value: "1,2,3", disabled: true });
	pushPair(out, "VectorEditor", "long", { value: "1,2", text: LONG, width: NARROW });
	pushPair(out, "VectorEditor", "sx", { value: "1,2" });
	pushPair(out, "UDimEditor", "default", { value: "0.5,8" });
	pushPair(out, "UDimEditor", "disabled", { value: "0.5,8", disabled: true });
	pushPair(out, "UDimEditor", "long", { value: "0.5,8", text: LONG, width: NARROW });
	pushPair(out, "UDimEditor", "sx", { value: "0.5,8" });
	pushPair(out, "CFrameEditor", "default", { value: "0,0,0" });
	pushPair(out, "CFrameEditor", "disabled", { value: "0,0,0", disabled: true });
	pushPair(out, "CFrameEditor", "narrow", { value: "0,0,0", width: 320 });
	pushPair(out, "CFrameEditor", "sx", { value: "0,0,0" });
	pushPair(out, "EnumPicker", "default", { value: "Continue", options: ["Continue", "Other"] });
	pushPair(out, "EnumPicker", "open", { value: "Continue", options: ["Continue", "Other"], open: true });
	pushPair(out, "EnumPicker", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true });
	pushPair(out, "EnumPicker", "sx", { value: "Continue", options: ["Continue", "Other"] });
	pushPair(out, "NumberRangeEditor", "default", { value: "0,1" });
	pushPair(out, "NumberRangeEditor", "disabled", { value: "0,1", disabled: true });
	pushPair(out, "NumberRangeEditor", "sx", { value: "0,1" });
	pushPair(out, "RectEditor", "default", { value: "0,0,1,1" });
	pushPair(out, "RectEditor", "disabled", { value: "0,0,1,1", disabled: true });
	pushPair(out, "RectEditor", "narrow", { value: "0,0,100,50", width: 320 });
	pushPair(out, "RectEditor", "sx", { value: "0,0,1,1" });
	pushPair(out, "AssetField", "empty", { text: "" });
	pushPair(out, "AssetField", "default", { text: "123" });
	pushPair(out, "AssetField", "disabled", { text: "123", disabled: true });
	pushPair(out, "AssetField", "sx", { text: "123" });
	pushPair(out, "GradientEditor", "default", { value: "gradient" });
	return out;
}

function togglesRows(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "GradientEditor", "disabled", { value: "gradient", disabled: true });
	pushPair(out, "RayEditor", "default", { value: "0,0,0,0,1,0" });
	pushPair(out, "RayEditor", "disabled", { value: "0,0,0,0,1,0", disabled: true });
	pushPair(out, "PhysicalPropertiesEditor", "default", { value: "0.7,0.3,0.5" });
	pushPair(out, "PhysicalPropertiesEditor", "disabled", { value: "0.7,0.3,0.5", disabled: true });
	pushPair(out, "PhysicalPropertiesEditor", "narrow", { value: "0.699999988079071,0.30000001192092896,0.5,1,1", width: 320 });
	pushPair(out, "GradientEditor", "sx", { value: "gradient" });
	pushPair(out, "RayEditor", "sx", { value: "0,0,0,0,1,0" });
	pushPair(out, "PhysicalPropertiesEditor", "sx", { value: "0.7,0.3,0.5" });
	pushPair(out, "FontEditor", "sx", { value: "Gotham" });
	pushPair(out, "ColorSequenceEditor", "sx", { value: "0,1,1" });
	pushPair(out, "NumberSequenceEditor", "sx", { value: "0,1" });
	pushPair(out, "Switch", "off");
	pushPair(out, "Switch", "size-small", { size: "small" });
	pushPair(out, "Switch", "size-medium", { size: "medium" });
	pushPair(out, "Switch", "size-large", { size: "large" });
	pushPair(out, "Switch", "density-compact", { density: "compact", size: "small" });
	pushPair(out, "Switch", "on", { value: true });
	pushPair(out, "Switch", "accent", { value: true, variant: "accent" });
	pushPair(out, "Switch", "disabled", { disabled: true });
	pushPair(out, "Switch", "disabled-on", { value: true, disabled: true });
	pushPair(out, "Switch", "hover", { pointer: "hover" });
	pushPair(out, "Switch", "press", { pointer: "press" });
	pushPair(out, "Switch", "focus", { pointer: "focus" });
	pushPair(out, "Switch", "on-hover", { value: true, pointer: "hover" });
	pushPair(out, "Switch", "on-press", { value: true, pointer: "press" });
	pushPair(out, "Switch", "on-focus", { value: true, pointer: "focus" });
	pushPair(out, "Switch", "reduced", { value: true, reducedMotion: true });
	pushPair(out, "Switch", "long", { text: LONG, width: NARROW });
	pushPair(out, "Switch", "sx", { variant: "sx" });
	pushPair(out, "Slider", "default", { value: 0.5 });
	pushPair(out, "Slider", "size-small", { value: 0.5, size: "small" });
	pushPair(out, "Slider", "size-medium", { value: 0.5, size: "medium" });
	pushPair(out, "Slider", "size-large", { value: 0.5, size: "large" });
	pushPair(out, "Slider", "density-compact", { value: 0.5, density: "compact", size: "small" });
	pushPair(out, "Slider", "disabled", { value: 0.5, disabled: true });
	pushPair(out, "Slider", "marks", { value: 0.5, marks: true });
	pushPair(out, "Slider", "accent", { value: 0.5, variant: "accent" });
	pushPair(out, "Slider", "hover", { value: 0.5, pointer: "hover" });
	pushPair(out, "Slider", "press", { value: 0.5, pointer: "press" });
	pushPair(out, "Slider", "focus", { value: 0.5, pointer: "focus" });
	pushPair(out, "Slider", "long", { value: 0.25, text: LONG, width: NARROW });
	pushPair(out, "Slider", "sx", { value: 0.5, variant: "sx" });
	pushPair(out, "RadioGroup", "default", { value: "Continue", options: ["Continue", "Other"] });
	pushPair(out, "RadioGroup", "row", { value: "Continue", options: ["Continue", "Other"], row: true });
	pushPair(out, "RadioGroup", "size-small", { value: "Continue", options: ["Continue", "Other"], size: "small" });
	pushPair(out, "RadioGroup", "size-large", { value: "Continue", options: ["Continue", "Other"], size: "large" });
	pushPair(out, "RadioGroup", "density-compact", { value: "Continue", options: ["Continue", "Other"], density: "compact", size: "small" });
	return out;
}

function compositeRows(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "RadioGroup", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true });
	pushPair(out, "RadioGroup", "disabled-option", {
			value: "Continue",
			options: ["Continue", "Other"],
			disabledOption: "Other",
		});
	pushPair(out, "RadioGroup", "hover", { value: "Continue", options: ["Continue", "Other"], pointer: "hover" });
	pushPair(out, "RadioGroup", "long", { value: LONG, options: [LONG, "Other"], text: LONG, width: NARROW });
	pushPair(out, "RadioGroup", "sx", { value: "Continue", options: ["Continue", "Other"], variant: "sx" });
	pushPair(out, "Select", "default", { value: "Continue", options: ["Continue", "Other"] });
	pushPair(out, "Select", "size-small", { value: "Continue", options: ["Continue", "Other"], size: "small" });
	pushPair(out, "Select", "size-large", { value: "Continue", options: ["Continue", "Other"], size: "large" });
	pushPair(out, "Select", "density-compact", { value: "Continue", options: ["Continue", "Other"], density: "compact", size: "small" });
	pushPair(out, "Select", "open", { value: "Continue", options: ["Continue", "Other"], open: true });
	pushPair(out, "Select", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true });
	pushPair(out, "Select", "loading", { value: "Continue", options: ["Continue", "Other"], loading: true });
	pushPair(out, "Select", "loading-reduced", { value: "Continue", options: ["Continue", "Other"], loading: true, reducedMotion: true });
	pushPair(out, "Select", "hover", { value: "Continue", options: ["Continue", "Other"], open: true, pointer: "hover" });
	pushPair(out, "Select", "press", { value: "Continue", options: ["Continue", "Other"], pointer: "press" });
	pushPair(out, "Select", "focus", { value: "Continue", options: ["Continue", "Other"], pointer: "focus" });
	pushPair(out, "Select", "long", { value: LONG, options: [LONG, "Other"], text: LONG, width: NARROW, open: true });
	pushPair(out, "Select", "sx", { value: "Continue", options: ["Continue", "Other"], variant: "sx" });
	pushPair(out, "Select", "search", {
			value: "Continue",
			options: ["Continue", "Other", "Docs", "Actions", "Source", "Settings", "Theme", "Inspector", "Controls"],
			open: true,
			filter: "con",
		});
	pushPair(out, "Select", "empty", { value: "", options: [], open: true });
	pushPair(out, "Select", "no-results", { value: "Continue", options: ["Continue", "Other"], open: true, filter: "zzz" });
	pushPair(out, "Tabs", "default", { value: "Continue", options: ["Continue", "Docs", "Actions"] });
	pushPair(out, "Tabs", "vertical", { value: "Continue", options: ["Continue", "Docs", "Actions"], variant: "vertical" });
	pushPair(out, "Tabs", "disabled", { value: "Continue", options: ["Continue", "Docs", "Actions"], disabled: true });
	pushPair(out, "Tabs", "centered", { value: "Continue", options: ["Continue", "Docs", "Actions"], variant: "centered" });
	pushPair(out, "Tabs", "hover", { value: "Continue", options: ["Continue", "Docs", "Actions"], pointer: "hover" });
	pushPair(out, "Tabs", "long", {
			value: LONG,
			options: [LONG, "Docs", "Actions", "Source", "Settings"],
			text: LONG,
			width: NARROW,
		});
	pushPair(out, "Tabs", "sx", { value: "Continue", options: ["Continue", "Docs", "Actions"], variant: "sx" });
	pushPair(out, "SplitPane", "default", { value: 160 });
	pushPair(out, "SplitPane", "disabled", { value: 160, disabled: true });
	pushPair(out, "SplitPane", "hover", { value: 160, pointer: "hover" });
	pushPair(out, "SplitPane", "drag", { value: 160, pointer: "press" });
	pushPair(out, "SplitPane", "long", { value: 80, text: LONG, width: NARROW });
	pushPair(out, "SplitPane", "sx", { value: 160 });
	pushPair(out, "Tooltip", "hidden");
	pushPair(out, "Tooltip", "shown", { pointer: "hover" });
	pushPair(out, "Tooltip", "long", { text: LONG, width: NARROW, pointer: "hover" });
	pushPair(out, "Tooltip", "sx", { text: "Hint" });
	pushPair(out, "TreeView", "default", { selected: "Fixture/Styled" });
	pushPair(out, "TreeView", "hover", { selected: "Fixture/Styled", pointer: "hover" });
	pushPair(out, "TreeView", "filter", { selected: "Fixture/Styled", filter: "sty" });
	pushPair(out, "TreeView", "long", { selected: `Fixture/${LONG}`, text: LONG, width: NARROW });
	pushPair(out, "TreeView", "sx", { selected: "Fixture/Styled" });
	pushPair(out, "IconButton", "loading", { loading: true });
	pushPair(out, "IconButton", "loading-disabled", { loading: true, disabled: true });
	return out;
}

function surfacesRows(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "IconButton", "loading-reduced", { loading: true, reducedMotion: true });
	pushPair(out, "Skeleton", "text", { variant: "text", animation: "pulse" });
	pushPair(out, "Skeleton", "text-static", { variant: "text", animation: false });
	pushPair(out, "Skeleton", "text-reduced", { variant: "text", animation: "shimmer", reducedMotion: true });
	pushPair(out, "Skeleton", "rectangular", { variant: "rectangular", animation: false });
	pushPair(out, "Skeleton", "rounded", { variant: "rounded", animation: "pulse" });
	pushPair(out, "Skeleton", "circular", { variant: "circular", animation: false });
	pushPair(out, "Skeleton", "shimmer", { variant: "rounded", animation: "shimmer" });
	pushPair(out, "Skeleton", "sx", { variant: "text", animation: false });
	pushPair(out, "CircularProgress", "empty", { value: 0 });
	pushPair(out, "CircularProgress", "half", { value: 0.5 });
	pushPair(out, "CircularProgress", "full", { value: 1 });
	pushPair(out, "CircularProgress", "indeterminate", { indeterminate: true });
	pushPair(out, "CircularProgress", "reduced", { indeterminate: true, reducedMotion: true });
	pushPair(out, "CircularProgress", "disabled", { value: 0.4, disabled: true });
	pushPair(out, "CircularProgress", "sx", { value: 0.4 });
	pushPair(out, "LinearProgress", "empty", { value: 0 });
	pushPair(out, "LinearProgress", "half", { value: 0.5 });
	pushPair(out, "LinearProgress", "full", { value: 1 });
	pushPair(out, "LinearProgress", "indeterminate", { indeterminate: true });
	pushPair(out, "LinearProgress", "reduced", { indeterminate: true, reducedMotion: true });
	pushPair(out, "LinearProgress", "disabled", { value: 0.6, disabled: true });
	pushPair(out, "LinearProgress", "sx", { value: 0.5, variant: "sx" });
	pushPair(out, "Dialog", "closed", { open: false });
	pushPair(out, "Dialog", "open", { open: true });
	pushPair(out, "Dialog", "sx", { open: true });
	pushPair(out, "Popup", "sx");
	pushPair(out, "Modal", "sx", { open: true });
	pushPair(out, "Paper", "flat", { variant: "flat" });
	pushPair(out, "Paper", "raised", { variant: "raised" });
	pushPair(out, "Paper", "square", { variant: "square" });
	pushPair(out, "Paper", "outlined", { variant: "outlined" });
	pushPair(out, "ListItem", "default");
	pushPair(out, "ListItem", "selected", { value: true });
	pushPair(out, "ListItem", "disabled", { disabled: true });
	pushPair(out, "ListItem", "secondary", { variant: "secondary" });
	pushPair(out, "ListItem", "dense", { variant: "dense" });
	pushPair(out, "ListItem", "divider", { variant: "divider" });
	pushPair(out, "ListItem", "sx");
	pushPair(out, "Card", "flat", { variant: "flat" });
	pushPair(out, "Card", "raised", { variant: "raised" });
	pushPair(out, "Card", "square", { variant: "square" });
	pushPair(out, "Card", "sx", { variant: "flat" });
	pushPair(out, "Chip", "default");
	pushPair(out, "Chip", "size-small", { size: "small" });
	pushPair(out, "Chip", "size-large", { size: "large" });
	pushPair(out, "Chip", "selected", { value: true });
	pushPair(out, "Chip", "disabled", { disabled: true });
	pushPair(out, "Chip", "deletable", { text: "Tag" });
	pushPair(out, "Chip", "outlined", { variant: "outlined" });
	pushPair(out, "Chip", "primary", { variant: "primary" });
	pushPair(out, "Chip", "sx", { variant: "sx" });
	pushPair(out, "Badge", "count", { value: 3 });
	pushPair(out, "Badge", "max", { value: 100 });
	return out;
}

function chromeRows(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "Badge", "invisible", { value: 0 });
	pushPair(out, "Badge", "dot", { variant: "dot" });
	pushPair(out, "Badge", "primary", { variant: "primary" });
	pushPair(out, "Badge", "sx", { value: 3, variant: "sx" });
	pushPair(out, "Avatar", "initials", { text: "BL" });
	pushPair(out, "Avatar", "image", { variant: "image" });
	pushPair(out, "Avatar", "small", { size: "small" });
	pushPair(out, "Avatar", "rounded", { variant: "rounded" });
	pushPair(out, "Avatar", "sx", { text: "BL", variant: "sx" });
	pushPair(out, "Drawer", "closed", { open: false });
	pushPair(out, "Drawer", "left", { open: true, variant: "left" });
	pushPair(out, "Drawer", "right", { open: true, variant: "right" });
	pushPair(out, "Drawer", "wide", { open: true, variant: "wide" });
	pushPair(out, "Drawer", "sx", { open: true, variant: "left" });
	pushPair(out, "Shadow", "sx");
	pushPair(out, "EmptyListHint", "sx", { text: "None" });
	pushPair(out, "Breadcrumbs", "single", { text: "Home" });
	pushPair(out, "Breadcrumbs", "trail", { text: "Home / Library / Item" });
	pushPair(out, "Breadcrumbs", "collapsed", { text: "Home / … / Item", size: "small" });
	pushPair(out, "Breadcrumbs", "custom-separator", { text: "Home > Item" });
	pushPair(out, "Breadcrumbs", "sx", { text: "Home / Item", variant: "sx" });
	pushPair(out, "Pagination", "first", { value: 1 });
	pushPair(out, "Pagination", "middle", { value: 3 });
	pushPair(out, "Pagination", "collapsed", { value: 10, size: "large" });
	pushPair(out, "Pagination", "disabled", { value: 2, disabled: true });
	pushPair(out, "Pagination", "size-small", { value: 2, size: "small" });
	pushPair(out, "Pagination", "outlined", { value: 2, variant: "outlined" });
	pushPair(out, "Pagination", "sx", { value: 2, variant: "sx" });
	pushPair(out, "Stepper", "first", { value: 0 });
	pushPair(out, "Stepper", "middle", { value: 1 });
	pushPair(out, "Stepper", "last", { value: 2 });
	pushPair(out, "Stepper", "vertical", { value: 1, variant: "vertical" });
	pushPair(out, "Stepper", "sx", { value: 1, variant: "sx" });
	pushPair(out, "Accordion", "closed", { open: false });
	pushPair(out, "Accordion", "open", { open: true });
	pushPair(out, "Accordion", "disabled", { open: false, disabled: true });
	pushPair(out, "Accordion", "indicator", { open: true });
	pushPair(out, "Accordion", "square", { variant: "square" });
	pushPair(out, "Accordion", "sx", { open: true, variant: "sx" });
	pushPair(out, "Snackbar", "open", { open: true, text: "Saved" });
	pushPair(out, "Snackbar", "closed", { open: false, text: "Saved" });
	pushPair(out, "Snackbar", "action", { open: true, text: "Undo" });
	pushPair(out, "Toast", "sx", { text: "Saved" });
	pushPair(out, "Table", "empty", { text: "" });
	pushPair(out, "Table", "default", { text: "Name / Role" });
	pushPair(out, "Table", "selected", { text: "Name / Role", value: 0 });
	pushPair(out, "Table", "dense", { text: "Name / Role", variant: "dense" });
	pushPair(out, "Table", "sx", { text: "Name / Role", variant: "sx" });
	pushPair(out, "Autocomplete", "default", { value: "Continue", options: ["Continue", "Other"] });
	pushPair(out, "Autocomplete", "open", { value: "Continue", options: ["Continue", "Other"], open: true });
	pushPair(out, "Autocomplete", "disabled", { value: "Continue", options: ["Continue", "Other"], disabled: true });
	pushPair(out, "Autocomplete", "empty", { value: "", options: [], open: true });
	pushPair(out, "Autocomplete", "no-results", {
			value: "Continue",
			options: ["Continue", "Other"],
			open: true,
			filter: "zzz",
		});
	pushPair(out, "Fab", "default");
	pushPair(out, "Fab", "extended", { text: "Compose" });
	pushPair(out, "Fab", "extended-narrow", { text: "Compose", width: 128 });
	pushPair(out, "Fab", "small", { size: "small" });
	pushPair(out, "Fab", "medium", { size: "medium" });
	pushPair(out, "Fab", "large", { size: "large" });
	pushPair(out, "Fab", "disabled", { disabled: true });
	pushPair(out, "Fab", "loading", { loading: true });
	pushPair(out, "Fab", "accent", { variant: "accent" });
	pushPair(out, "Fab", "sx", { variant: "sx" });
	pushPair(out, "AppBar", "default", { text: "Storyblox" });
	pushPair(out, "AppBar", "flat", { text: "Storyblox", variant: "flat" });
	pushPair(out, "AppBar", "raised", { text: "Storyblox", variant: "raised" });
	pushPair(out, "AppBar", "primary", { text: "Storyblox", variant: "primary" });
	pushPair(out, "AppBar", "sx", { text: "Storyblox", variant: "sx" });
	pushPair(out, "BottomNavigation", "default", { value: "Home", options: ["Home", "Search", "Profile"] });
	return out;
}

function miscRowsA(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "BottomNavigation", "selected", { value: "Search", options: ["Home", "Search", "Profile"] });
	pushPair(out, "BottomNavigation", "disabled", { value: "Home", options: ["Home", "Search", "Profile"], disabled: true });
	pushPair(out, "BottomNavigation", "icons", { value: "Home", options: ["Home", "Search", "Profile"], variant: "icons" });
	pushPair(out, "BottomNavigation", "sx", { value: "Home", options: ["Home", "Search", "Profile"], variant: "sx" });
	pushPair(out, "Alert", "info", { text: "Heads up", variant: "info" });
	pushPair(out, "Alert", "success", { text: "Saved", variant: "success" });
	pushPair(out, "Alert", "warning", { text: "Check this", variant: "warning" });
	pushPair(out, "Alert", "error", { text: "Failed", variant: "error" });
	pushPair(out, "Alert", "filled", { text: "Heads up", variant: "filled" });
	pushPair(out, "Alert", "square", { text: "Heads up", variant: "square" });
	pushPair(out, "Alert", "sx", { text: "Heads up", variant: "sx" });
	pushPair(out, "ToggleButton", "default");
	pushPair(out, "ToggleButton", "selected", { value: true });
	pushPair(out, "ToggleButton", "disabled", { disabled: true });
	pushPair(out, "ToggleButton", "size-small", { size: "small" });
	pushPair(out, "ToggleButton", "sx", { variant: "sx" });
	pushPair(out, "ToggleButtonGroup", "default", { value: "Left", options: ["Left", "Center", "Right"] });
	pushPair(out, "ToggleButtonGroup", "selected", { value: "Center", options: ["Left", "Center", "Right"] });
	pushPair(out, "ToggleButtonGroup", "vertical", { value: "Center", options: ["Left", "Center", "Right"], variant: "vertical" });
	pushPair(out, "ToggleButtonGroup", "sx", { value: "Left", options: ["Left", "Center", "Right"], variant: "sx" });
	pushPair(out, "Link", "default", { text: "Open docs" });
	pushPair(out, "Link", "hover-underline", { text: "Open docs", variant: "hover", pointer: "hover" });
	pushPair(out, "Link", "disabled", { text: "Open docs", disabled: true });
	pushPair(out, "Link", "error", { text: "Open docs", variant: "error" });
	pushPair(out, "Link", "sx", { text: "Open docs", variant: "sx" });
	pushPair(out, "Rating", "default", { value: 0 });
	pushPair(out, "Rating", "filled", { value: 3 });
	pushPair(out, "Rating", "disabled", { value: 4, disabled: true });
	pushPair(out, "Rating", "size-small", { value: 3, size: "small" });
	pushPair(out, "Rating", "readonly", { value: 3 });
	pushPair(out, "Rating", "sx", { value: 3, variant: "sx" });
	pushPair(out, "Stack", "column", { variant: "column" });
	pushPair(out, "Stack", "row", { variant: "row" });
	pushPair(out, "Stack", "spaced", { variant: "column", size: "large" });
	pushPair(out, "Stack", "wrap", { variant: "row", width: WIDE });
	pushPair(out, "Stack", "justify-between", { variant: "space-between", width: WIDE });
	pushPair(out, "Stack", "align-stretch", { variant: "stretch" });
	pushPair(out, "FlexItem", "grow", { variant: "grow" });
	pushPair(out, "FlexItem", "shrink", { variant: "shrink" });
	pushPair(out, "FlexItem", "fill", { variant: "fill" });
	pushPair(out, "Grid", "columns-3", { variant: "3" });
	pushPair(out, "Grid", "start-bottom-right", { variant: "bottom-right" });
	pushPair(out, "Grid", "gap", { size: "medium" });
	pushPair(out, "Box", "plain");
	pushPair(out, "Box", "padded", { size: "medium" });
	pushPair(out, "Box", "paper", { variant: "paper" });
	pushPair(out, "Box", "sx", { variant: "sx" });
	pushPair(out, "Stack", "sx", { variant: "sx" });
	pushPair(out, "Paper", "sx", { variant: "sx" });
	pushPair(out, "StyleSx", "default");
	pushPair(out, "StyleSx", "hover", { pointer: "hover" });
	pushPair(out, "StyleSx", "narrow", { width: NARROW });
	pushPair(out, "StyleSx", "disabled", { disabled: true });
	pushPair(out, "StyleSx", "loading", { loading: true });
	return out;
}

function miscRowsB(): StateCapture[] {
	const out: StateCapture[] = [];
	pushPair(out, "Container", "default", { variant: "lg" });
	pushPair(out, "Container", "sm", { variant: "sm" });
	pushPair(out, "Container", "fluid", { variant: "false" });
	pushPair(out, "Backdrop", "default");
	pushPair(out, "Backdrop", "invisible", { variant: "invisible" });
	pushPair(out, "Backdrop", "closed", { open: false });
	pushPair(out, "Backdrop", "sx", { variant: "sx" });
	pushPair(out, "Sidebar", "sx", { variant: "sx" });
	pushPair(out, "Divider", "horizontal", { variant: "horizontal" });
	pushPair(out, "Divider", "vertical", { variant: "vertical" });
	pushPair(out, "Divider", "label", { text: "Or" });
	pushPair(out, "Divider", "sx", { variant: "sx" });
	pushPair(out, "Icon", "sx", { variant: "sx" });
	pushPair(out, "ImageList", "default");
	pushPair(out, "ImageList", "dense", { size: "small" });
	pushPair(out, "ImageList", "wide", { size: "large" });
	pushPair(out, "ImageList", "titled", { text: "Cove" });
	pushPair(out, "ImageList", "untitled", { text: "" });
	pushPair(out, "ImageList", "sx");
	pushPair(out, "SpeedDial", "closed", { open: false });
	pushPair(out, "SpeedDial", "open", { open: true });
	pushPair(out, "SpeedDial", "disabled", { open: false, disabled: true });
	pushPair(out, "SpeedDial", "down", { open: true, variant: "down" });
	pushPair(out, "SpeedDial", "sx", { open: false });
	pushPair(out, "List", "sx");
	pushPair(out, "Preloader", "sx");
	pushPair(out, "VirtualList", "sx");
	pushPair(out, "FormLabel", "default", { text: "Email" });
	pushPair(out, "FormLabel", "required", { text: "Email", value: true });
	pushPair(out, "FormLabel", "error", { text: "Email", hasError: true });
	pushPair(out, "FormLabel", "sx", { text: "Email", variant: "sx" });
	pushPair(out, "FormHelperText", "default", { text: "We never share this" });
	pushPair(out, "FormHelperText", "error", { text: "Required", hasError: true });
	pushPair(out, "FormHelperText", "sx", { text: "Hint", variant: "sx" });
	pushPair(out, "Typography", "sx", { text: "Title", variant: "sx" });
	pushPair(out, "Menu", "closed", { open: false });
	pushPair(out, "Menu", "open", { open: true });
	pushPair(out, "Menu", "empty", { open: true, options: [] });
	pushPair(out, "Menu", "dense", { open: true, variant: "dense" });
	pushPair(out, "Menu", "selected", { open: true, selected: "a" });
	pushPair(out, "Menu", "sx", { open: true });
	pushPair(out, "Markdown", "default", { text: "# Title\n\nHello **world**" });
	pushPair(out, "Markdown", "empty", { text: "" });
	pushPair(out, "Markdown", "sx", { text: "# Title" });
	pushPair(out, "MarkdownEditor", "split", { text: "# Title", variant: "split" });
	pushPair(out, "MarkdownEditor", "edit", { text: "# Title", variant: "edit" });
	pushPair(out, "MarkdownEditor", "preview", { text: "# Title", variant: "preview" });
	pushPair(out, "MarkdownEditor", "density-compact", { text: "# Title", density: "compact", variant: "split" });
	pushPair(out, "MarkdownEditor", "sx", { text: "# Title", variant: "split" });
	return out;
}

function concatRows(...chunks: StateCapture[][]): StateCapture[] {
	const out: StateCapture[] = [];
	for (const chunk of chunks) {
		for (const row of chunk) {
			out.push(row);
		}
	}
	return out;
}

export const stateMatrix: StateCapture[] = concatRows(
	controlsRows(),
	editorsRows(),
	togglesRows(),
	compositeRows(),
	surfacesRows(),
	chromeRows(),
	miscRowsA(),
	miscRowsB(),
);
