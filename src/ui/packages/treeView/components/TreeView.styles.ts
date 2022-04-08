import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useTreeViewStyles = makeStyles((theme: Theme) => {
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
			AutomaticCanvasSize: Enum.AutomaticSize.XY,
			ScrollBarThickness: theme.spacing.calc(0.5),
			ScrollBarImageTransparency: 0.75,
			ClipsDescendants: true,
			ZIndex: 300,
		} as WriteableStyle<ScrollingFrame>,
		gridLayout: {
			CellPadding: new UDim2(0, 0, 0, 0),
			CellSize: new UDim2(1, 0, 0, theme.spacing.calc(1) + theme.padding.calc(4)),
			FillDirection: Enum.FillDirection.Horizontal,
			FillDirectionMaxCells: 1, // So that there is only one column
			HorizontalAlignment: Enum.HorizontalAlignment.Center,
			VerticalAlignment: Enum.VerticalAlignment.Top,
			SortOrder: Enum.SortOrder.Name,
		} as WriteableStyle<UIGridLayout>,
		row: {
			Text: "",
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5200,
		} as WriteableStyle<TextButton>,
		branchIcon: {
			Position: new UDim2(0, 0, 0.5, 0),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<ImageLabel>,
		branchTypography: {
			Size: new UDim2(1, -(theme.spacing.calc(0.5) + theme.padding.calc(2)), 1, -theme.padding.calc(4)),
			Position: new UDim2(1, 0, 0.5, 0),
			AnchorPoint: new Vector2(1, 0.5),
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Center,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<TextLabel>,
		leafIcon: {
			Position: new UDim2(0, theme.padding.calc(4), 0.5, 0),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<ImageLabel>,
		leafTypography: {
			Size: new UDim2(1, -(theme.spacing.calc(1) + theme.padding.calc(6)), 1, -theme.padding.calc(4)),
			Position: new UDim2(1, 0, 0.5, 0),
			AnchorPoint: new Vector2(1, 0.5),
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Center,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 5300,
		} as WriteableStyle<TextLabel>,
	});
});

export default useTreeViewStyles;
