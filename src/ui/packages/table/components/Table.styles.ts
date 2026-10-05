import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useTableStyles = componentStyles("Table", (theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Text: "",
			AutoButtonColor: false,
			Active: true,
			Selectable: true,
		} as WriteableStyle<TextButton>,
		selected: {
			BackgroundColor3: theme.palette.action.selected,
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		header: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		cells: {
			FillDirection: Enum.FillDirection.Horizontal,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		cell: {
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextLabel>,
		headerCell: {
			Font: theme.typography.fontFamilies.semibold,
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(1)),
			PaddingBottom: new UDim(0, theme.padding.calc(1)),
			PaddingLeft: new UDim(0, theme.padding.calc(1.5)),
			PaddingRight: new UDim(0, theme.padding.calc(1.5)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	}),
);

export default useTableStyles;
