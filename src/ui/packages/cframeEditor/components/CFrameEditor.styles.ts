import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useCFrameEditorStyles = componentStyles("CFrameEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		wrap: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(0.5)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(0.5)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		group: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		groupLabel: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.button,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		axes: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		axis: {
			Size: new UDim2(1 / 3, -theme.padding.calc(0.5), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(0, theme.spacing.calc(2.5), 1, 0),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.semibold,
			TextSize: theme.typography.fontSizes.button,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		labelX: {
			TextColor3: theme.palette.status.error.main,
		} as WriteableStyle<TextLabel>,
		labelY: {
			TextColor3: theme.palette.status.success.main,
		} as WriteableStyle<TextLabel>,
		labelZ: {
			TextColor3: theme.palette.status.info.main,
		} as WriteableStyle<TextLabel>,
		field: {
			Size: new UDim2(1, -theme.spacing.calc(2.5), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useCFrameEditorStyles;
