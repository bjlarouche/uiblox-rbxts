import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

globalThis.typeOf = (value) => {
	if (value instanceof globalThis.UDim) return "UDim";
	if (value instanceof globalThis.UDim2) return "UDim2";
	if (typeof value === "object" && value !== null) return "table";
	return typeof value;
};
globalThis.typeIs = (value, typeName) => {
	if (typeName === "string") return typeof value === "string";
	if (typeName === "number") return typeof value === "number";
	return false;
};
globalThis.pairs = (record) => Object.keys(record).map((key) => [key, record[key]]);
globalThis.string = { lower: (value) => String(value).toLowerCase() };
globalThis.math = { huge: Infinity };
globalThis.UDim = class UDim {
	constructor(scale = 0, offset = 0) {
		this.Scale = scale;
		this.Offset = offset;
	}
};
globalThis.UDim2 = class UDim2 {
	constructor(xScale = 0, xOffset = 0, yScale = 0, yOffset = 0) {
		this.X = new UDim(xScale, xOffset);
		this.Y = new UDim(yScale, yOffset);
	}
};

const { hostRest, layoutGapPatch, sxUsesBreakpoints } = await import("../src/ui/packages/host/hostRules.ts");

const keep = layoutGapPatch("uilistlayout", { Padding: new UDim(0, 4) }, 16);
if (keep !== undefined) throw new Error("explicit list padding wins");
const fill = layoutGapPatch("uilistlayout", {}, 16);
if (fill?.Padding?.Offset !== 16) throw new Error("gap fills empty list");
const gridKeep = layoutGapPatch("uigridlayout", { CellPadding: new UDim2(0, 2, 0, 2) }, 8);
if (gridKeep !== undefined) throw new Error("explicit cell padding wins");
const gridFill = layoutGapPatch("uigridlayout", {}, 8);
if (gridFill?.CellPadding?.X?.Offset !== 8) throw new Error("gap fills empty grid");

if (sxUsesBreakpoints({ width: 10 })) throw new Error("plain width");
if (!sxUsesBreakpoints({ width: { phone: 80, desktop: 200 } })) throw new Error("responsive width");

const rest = hostRest({ tag: "frame", sx: { p: 1 }, Text: "Go", children: "x" });
if (rest.Text !== "Go" || rest.sx !== undefined || rest.children !== undefined) throw new Error("rest strips host keys");

const { resolveSx } = await import("../src/theme/styles/utilities/resolveSx.ts");
const { resolveStyle } = await import("../src/theme/styles/utilities/resolveStyle.ts");
const theme = {
	spacing: { calc: (n) => 8 * n },
	palette: {},
	typography: { fontFamilies: {}, variants: {} },
};
const narrow = resolveSx(
	theme,
	{
		width: { phone: 80, desktop: 200 },
		_hover: { BackgroundTransparency: 0.2 },
		_disabled: { BackgroundTransparency: 0.8 },
	},
	400,
);
if (narrow.root.Size?.X?.Offset !== 80) throw new Error("phone width");
const wide = resolveSx(theme, { width: { phone: 80, desktop: 200 } }, 1000);
if (wide.root.Size?.X?.Offset !== 200) throw new Error("desktop width");
const hovered = resolveStyle(narrow.root, { hover: true });
if (hovered.BackgroundTransparency !== 0.2) throw new Error("hover selector");
const locked = resolveStyle(narrow.root, { hover: true, disabled: true });
if (locked.BackgroundTransparency !== 0.8) throw new Error("disabled selector");

const hosts = [
	"src/ui/packages/layout/components/Box.tsx",
	"src/ui/packages/layout/components/Stack.tsx",
	"src/ui/packages/layout/components/FlexItem.tsx",
	"src/ui/packages/layout/components/Grid.tsx",
	"src/ui/packages/layout/components/Container.tsx",
	"src/ui/packages/paper/components/Paper.tsx",
	"src/ui/packages/button/components/Button.tsx",
	"src/ui/packages/iconButton/components/IconButton.tsx",
	"src/ui/packages/input/components/Input.tsx",
	"src/ui/packages/select/components/Select.tsx",
	"src/ui/packages/typography/components/Typography.tsx",
	"src/ui/packages/formText/components/FormLabel.tsx",
	"src/ui/packages/formText/components/FormHelperText.tsx",
	"src/ui/packages/checkbox/components/Checkbox.tsx",
	"src/ui/packages/switch/components/Switch.tsx",
	"src/ui/packages/slider/components/Slider.tsx",
	"src/ui/packages/radioGroup/components/RadioGroup.tsx",
	"src/ui/packages/alert/components/Alert.tsx",
	"src/ui/packages/avatar/components/Avatar.tsx",
	"src/ui/packages/badge/components/Badge.tsx",
	"src/ui/packages/divider/components/Divider.tsx",
	"src/ui/packages/icon/components/Icon.tsx",
	"src/ui/packages/breadcrumbs/components/Breadcrumbs.tsx",
	"src/ui/packages/pagination/components/Pagination.tsx",
	"src/ui/packages/progressBar/components/ProgressBar.tsx",
	"src/ui/packages/appBar/components/AppBar.tsx",
	"src/ui/packages/backdrop/components/Backdrop.tsx",
	"src/ui/packages/stepper/components/Stepper.tsx",
	"src/ui/packages/sidebar/components/Sidebar.tsx",
	"src/ui/packages/rating/components/Rating.tsx",
	"src/ui/packages/chip/components/Chip.tsx",
	"src/ui/packages/link/components/Link.tsx",
	"src/ui/packages/toggleButton/components/ToggleButton.tsx",
	"src/ui/packages/fab/components/Fab.tsx",
	"src/ui/packages/accordion/components/Accordion.tsx",
	"src/ui/packages/bottomNavigation/components/BottomNavigation.tsx",
	"src/ui/packages/tabs/components/Tabs.tsx",
	"src/ui/packages/table/components/Table.tsx",
	"src/ui/packages/toast/components/Toast.tsx",
	"src/ui/packages/tooltip/components/Tooltip.tsx",
	"src/ui/packages/skeleton/components/Skeleton.tsx",
	"src/ui/packages/circularProgress/components/CircularProgress.tsx",
	"src/ui/packages/imageList/components/ImageList.tsx",
	"src/ui/packages/layout/components/List.tsx",
	"src/ui/packages/preloader/components/Preloader.tsx",
	"src/ui/packages/speedDial/components/SpeedDial.tsx",
	"src/ui/packages/splitPane/components/SplitPane.tsx",
	"src/ui/packages/treeView/components/TreeView.tsx",
	"src/ui/packages/virtualList/components/VirtualList.tsx",
	"src/ui/packages/markdown/components/Markdown.tsx",
	"src/ui/packages/markdown/components/MarkdownEditor.tsx",
	"src/ui/packages/assetField/components/AssetField.tsx",
	"src/ui/packages/brickColorPicker/components/BrickColorPicker.tsx",
	"src/ui/packages/cframeEditor/components/CFrameEditor.tsx",
	"src/ui/packages/colorPicker/components/ColorPicker.tsx",
	"src/ui/packages/colorPicker/components/ColorSequenceEditor.tsx",
	"src/ui/packages/colorPicker/components/NumberSequenceEditor.tsx",
	"src/ui/packages/fontEditor/components/FontEditor.tsx",
	"src/ui/packages/gradientEditor/components/GradientEditor.tsx",
	"src/ui/packages/numberRangeEditor/components/NumberRangeEditor.tsx",
	"src/ui/packages/physicalPropertiesEditor/components/PhysicalPropertiesEditor.tsx",
	"src/ui/packages/rayEditor/components/RayEditor.tsx",
	"src/ui/packages/rectEditor/components/RectEditor.tsx",
	"src/ui/packages/udimEditor/components/UDimEditor.tsx",
	"src/ui/packages/vectorEditor/components/VectorEditor.tsx",
	"src/ui/packages/menu/components/Menu.tsx",
];
for (const file of hosts) {
	const text = readFileSync(file, "utf8");
	if (!text.includes("<SxHost")) throw new Error(`${file} missing SxHost`);
	if (text.includes("{...sx}")) throw new Error(`${file} still spreads sx`);
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const component of ["Box", "Stack", "Paper", "Button", "IconButton", "Input", "Select", "FormLabel", "FormHelperText", "Typography", "Checkbox", "Switch", "Slider", "RadioGroup", "Alert", "Avatar", "Badge", "Divider", "Icon", "Breadcrumbs", "Pagination", "LinearProgress", "Stepper", "AppBar", "Rating", "Backdrop", "Sidebar", "Chip", "Link", "ToggleButton", "ToggleButtonGroup", "Fab", "Accordion", "BottomNavigation", "Tabs", "Table", "Toast", "Tooltip", "Skeleton", "CircularProgress", "ImageList", "List", "Preloader", "SpeedDial", "SplitPane", "TreeView", "VirtualList", "Markdown", "MarkdownEditor", "AssetField", "BrickColorPicker", "CFrameEditor", "ColorPicker", "ColorSequenceEditor", "NumberSequenceEditor", "FontEditor", "GradientEditor", "NumberRangeEditor", "PhysicalPropertiesEditor", "RayEditor", "RectEditor", "UDimEditor", "VectorEditor", "EnumPicker", "Menu"]) {
	if (stateMatrix.filter((row) => row.component === component && row.name.includes("-sx-")).length !== 2) {
		throw new Error(`${component} sx matrix`);
	}
}

const snackbar = readFileSync("src/ui/packages/snackbar/components/Snackbar.tsx", "utf8");
const toast = readFileSync("src/ui/packages/toast/components/Toast.tsx", "utf8");
if (!snackbar.includes("sx={sx}") || !toast.includes("<SxHost") || !toast.includes("frameRef.current")) {
	throw new Error("snackbar toast sx");
}
const autocomplete = readFileSync("src/ui/packages/autocomplete/components/Autocomplete.tsx", "utf8");
const select = readFileSync("src/ui/packages/select/components/Select.tsx", "utf8");
const input = readFileSync("src/ui/packages/input/components/Input.tsx", "utf8");
if (!autocomplete.includes("sx={sx}") || !select.includes("<SxHost") || !select.includes("sx={sx}") || !input.includes("<SxHost")) {
	throw new Error("autocomplete select sx");
}
const stroke = readFileSync("src/ui/packages/loadingStroke/components/LoadingStroke.tsx", "utf8");
if (!stroke.includes("<uistroke") || !stroke.includes("{...sx}")) throw new Error("loading stroke host");

const rawSxAllowed = new Set([
	"src/ui/packages/loadingStroke/components/LoadingStroke.tsx",
]);
const enumPicker = readFileSync("src/ui/packages/enumPicker/components/EnumPicker.tsx", "utf8");
const numberInput = readFileSync("src/ui/packages/numberInput/components/NumberInput.tsx", "utf8");
if (!enumPicker.includes("sx={sx}") || !numberInput.includes("sx={sx}")) throw new Error("editor sx forward");
function walkTsx(dir, out = []) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) walkTsx(path, out);
		else if (name.endsWith(".tsx")) out.push(path);
	}
	return out;
}
for (const file of walkTsx("src/ui/packages")) {
	if (!readFileSync(file, "utf8").includes("{...sx}")) continue;
	if (!rawSxAllowed.has(file)) throw new Error(`${file} still spreads sx`);
}

console.log("host sx ok");
