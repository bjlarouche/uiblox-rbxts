import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useSelectStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			Size: UDim2.fromOffset(theme.spacing.calc(8), theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		trigger: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextButton>,
		placeholder: {
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.default),
			PaddingRight: new UDim(0, theme.padding.default),
		} as WriteableStyle<UIPadding>,
		list: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ScrollBarThickness: theme.padding.default,
			ScrollBarImageColor3: theme.palette.text.secondary,
			CanvasSize: UDim2.fromScale(0, 0),
			AutomaticCanvasSize: Enum.AutomaticSize.Y,
			ScrollingDirection: Enum.ScrollingDirection.Y,
			ZIndex: 20001,
		} as WriteableStyle<ScrollingFrame>,
		listSize: {
			MaxSize: new Vector2(math.huge, theme.spacing.calc(16)),
		} as WriteableStyle<UISizeConstraint>,
		layout: {
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		option: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundColor3: theme.palette.primary.main,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
			ZIndex: 20002,
		} as WriteableStyle<TextButton>,
		highlighted: {
			BackgroundTransparency: 0.6,
		} as WriteableStyle<TextButton>,
		disabledOption: {
			TextTransparency: 0.5,
		} as WriteableStyle<TextButton>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	}),
);

export default useSelectStyles;
