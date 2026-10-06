import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useGradientEditorStyles = componentStyles("GradientEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		column: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(0.5)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		block: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.button,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		metrics: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		metricsRow: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(1)),
			VerticalAlignment: Enum.VerticalAlignment.Top,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		metric: {
			Size: new UDim2(0.5, -theme.padding.calc(0.5), 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		metricInner: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(0.5)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		metricLabel: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.button,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		metricField: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useGradientEditorStyles;
