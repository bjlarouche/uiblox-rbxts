import { controlMetrics, ControlSize, createStyles, componentStyles, focusRing, Theme, WriteableStyle } from "theme";
import { fieldChrome } from "../../input/components/fieldChrome";

export interface SelectStyleProps {
	size?: ControlSize;
	hasError?: boolean;
	helperText?: string;
}

const useSelectStyles = componentStyles<SelectStyleProps>("Select", (theme: Theme, { size, hasError = false, helperText }) => {
	const metrics = controlMetrics(theme.density, size);
	const chrome = fieldChrome(metrics.height, theme.padding.calc(1));
	const withHelper = helperText !== undefined;
	return createStyles({
		root: {
			Size: UDim2.fromOffset(theme.spacing.calc(12), withHelper ? chrome.height + metrics.height : chrome.height),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		trigger: {
			Size: new UDim2(1, 0, 0, chrome.height),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextButton>,
		placeholder: {
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingLeft: new UDim(0, chrome.padX),
			PaddingRight: new UDim(0, chrome.padX),
		} as WriteableStyle<UIPadding>,
		menu: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ZIndex: 20001,
		} as WriteableStyle<Frame>,
		search: {
			Size: new UDim2(1, 0, 0, metrics.height),
			BackgroundTransparency: 1,
			ZIndex: 20002,
		} as WriteableStyle<Frame>,
		list: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScrollBarThickness: theme.padding.default,
			ScrollBarImageColor3: theme.palette.text.secondary,
			ScrollingDirection: Enum.ScrollingDirection.Y,
			ZIndex: 20001,
		} as WriteableStyle<ScrollingFrame>,
		option: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
			ZIndex: 20002,
		} as WriteableStyle<TextButton>,
		highlighted: {
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		selected: {
			BackgroundColor3: theme.palette.action.selected,
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		group: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			ZIndex: 20002,
		} as WriteableStyle<TextLabel>,
		disabledOption: {
			TextTransparency: 0.5,
		} as WriteableStyle<TextButton>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: hasError ? theme.palette.status.error.main : theme.palette.border,
			Transparency: 0,
			Thickness: 1,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		errorText: {
			TextColor3: theme.palette.status.error.main,
		} as WriteableStyle<TextLabel>,
		helper: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			Position: new UDim2(0, 0, 1, 0),
			AnchorPoint: new Vector2(0, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextColor3: hasError ? theme.palette.status.error.main : theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		focusStroke: focusRing(theme.palette.focus) as WriteableStyle<UIStroke>,
	});
});


export default useSelectStyles;
