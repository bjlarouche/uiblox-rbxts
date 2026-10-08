import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useTimelineStyles = componentStyles("Timeline", (theme: Theme) => {
	const dot = theme.spacing.calc(1.5);
	const rail = theme.spacing.calc(2);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, 0),
		} as WriteableStyle<UIListLayout>,
		item: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			SortOrder: Enum.SortOrder.LayoutOrder,
			ItemLineAlignment: Enum.ItemLineAlignment.Stretch,
			Padding: new UDim(0, theme.spacing.calc(1)),
		} as WriteableStyle<UIListLayout>,
		rail: {
			Size: UDim2.fromOffset(rail, 0),
			LayoutOrder: 0,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		dot: {
			AnchorPoint: new Vector2(0.5, 0),
			Position: new UDim2(0.5, 0, 0, 2),
			Size: UDim2.fromOffset(dot, dot),
			BorderSizePixel: 0,
			ZIndex: 2,
		} as WriteableStyle<Frame>,
		done: { BackgroundColor3: theme.palette.status.success.main } as WriteableStyle<Frame>,
		active: { BackgroundColor3: theme.palette.primary.main } as WriteableStyle<Frame>,
		pending: { BackgroundColor3: theme.palette.text.disabled } as WriteableStyle<Frame>,
		error: { BackgroundColor3: theme.palette.status.error.main } as WriteableStyle<Frame>,
		line: {
			AnchorPoint: new Vector2(0.5, 0),
			Position: new UDim2(0.5, 0, 0, dot + 2),
			Size: new UDim2(0, 2, 1, -(dot + 2)),
			BackgroundColor3: theme.palette.divider,
			BorderSizePixel: 0,
			ZIndex: 1,
		} as WriteableStyle<Frame>,
		body: {
			LayoutOrder: 1,
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		bodyPad: {
			PaddingBottom: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
		bodyList: {
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.padding.calc(0.5)),
		} as WriteableStyle<UIListLayout>,
		title: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		caption: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
	});
});

export default useTimelineStyles;
