import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useFontEditorStyles = componentStyles("FontEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		column: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		pair: {
			Size: new UDim2(0.5, -theme.padding.calc(0.5), 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		fill: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
		} as WriteableStyle<Frame>,
		preview: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			Text: "The quick brown fox",
			TextColor3: theme.palette.text.primary,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.default),
			PaddingRight: new UDim(0, theme.padding.default),
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

export default useFontEditorStyles;
