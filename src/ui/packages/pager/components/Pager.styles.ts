import { componentStyles, controlMetrics, createStyles, Theme, WriteableStyle } from "theme";

const usePagerStyles = componentStyles("Pager", (theme: Theme) => {
	const metrics = controlMetrics(theme.density, "small");
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(2)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		bar: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
		} as WriteableStyle<Frame>,
		barList: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(2)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		button: {
			Size: UDim2.fromOffset(64, metrics.buttonHeight),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			AutoButtonColor: false,
		} as WriteableStyle<TextButton>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			Size: UDim2.fromScale(0, 0),
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextTruncate: Enum.TextTruncate.AtEnd,
			TextWrapped: false,
		} as WriteableStyle<TextLabel>,
		labelCap: {
			MaxSize: new Vector2(theme.spacing.calc(10), math.huge),
		} as WriteableStyle<UISizeConstraint>,
		body: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
		} as WriteableStyle<Frame>,
	});
});

export default usePagerStyles;
