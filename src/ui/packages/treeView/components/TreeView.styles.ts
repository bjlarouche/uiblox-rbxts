import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useTreeViewStyles = componentStyles("TreeView", (theme: Theme) => {
	return createStyles({
		root: {
			Size: new UDim2(1, -theme.padding.calc(4), 1, -theme.padding.calc(4)),
			Position: new UDim2(0.5, 0, 0.5, 0),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			ClipsDescendants: true,
			ZIndex: 300,
		} as WriteableStyle<Frame>,
		header: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(1)),
			Position: new UDim2(0.5, 0, 0, 0),
			AnchorPoint: new Vector2(0.5, 0),
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Center,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<TextLabel>,
		list: {
			Size: new UDim2(1, 0, 1, -(theme.spacing.calc(1) + theme.padding.calc(2))),
			Position: new UDim2(0.5, 0, 0, theme.spacing.calc(1) + theme.padding.calc(2)),
			AnchorPoint: new Vector2(0.5, 0),
			BackgroundTransparency: 1,
			ScrollBarThickness: theme.spacing.calc(0.5),
			ScrollBarImageTransparency: 0.75,
			ClipsDescendants: true,
			ZIndex: 300,
		} as WriteableStyle<ScrollingFrame>,
		row: {
			Text: "",
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5200,
		} as WriteableStyle<TextButton>,
		rowIcon: {
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<ImageLabel>,
		label: {
			AnchorPoint: new Vector2(0, 0.5),
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Center,
			TextTruncate: Enum.TextTruncate.AtEnd,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<TextLabel>,
	});
});

export default useTreeViewStyles;
