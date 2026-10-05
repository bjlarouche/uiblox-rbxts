import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useBrickColorPickerStyles = componentStyles("BrickColorPicker", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(1)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		trigger: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Text: "",
		} as WriteableStyle<TextButton>,
		swatch: {
			Size: UDim2.fromOffset(theme.spacing.calc(1.5), theme.spacing.calc(1.5)),
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(1, -theme.spacing.calc(2.5), 1, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextLabel>,
		menu: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		search: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		list: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ScrollBarThickness: theme.padding.default,
			ScrollBarImageColor3: theme.palette.text.secondary,
			ScrollingDirection: Enum.ScrollingDirection.Y,
		} as WriteableStyle<ScrollingFrame>,
		option: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Text: "",
		} as WriteableStyle<TextButton>,
		highlighted: {
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		selected: {
			BackgroundColor3: theme.palette.action.selected,
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		optionLabel: {
			Size: new UDim2(1, -theme.spacing.calc(2.5), 1, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.calc(1)),
			PaddingRight: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	}),
);

export default useBrickColorPickerStyles;
