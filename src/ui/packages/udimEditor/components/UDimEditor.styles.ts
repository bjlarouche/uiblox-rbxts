import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useUDimEditorStyles = componentStyles("UDimEditor", (theme: Theme) =>
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
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(1)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		axis: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		field: {
			Size: new UDim2(0.5, -theme.padding.calc(1), 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(0, theme.spacing.calc(2), 1, 0),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		input: {
			Size: new UDim2(1, -theme.spacing.calc(2), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useUDimEditorStyles;
