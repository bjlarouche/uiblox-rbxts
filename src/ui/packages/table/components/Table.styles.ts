import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useTableStyles = componentStyles<{ dense?: boolean }>("Table", (theme: Theme, { dense }) => {
	const padY = theme.padding.calc(dense === true ? 0.5 : 1);
	const padX = theme.padding.calc(dense === true ? 1 : 1.5);
	const textSize = dense === true ? theme.typography.fontSizes.caption : theme.typography.fontSizes.body;
	return createStyles({
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
			TextSize: textSize,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextLabel>,
		headerCell: {
			Font: theme.typography.fontFamilies.semibold,
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingTop: new UDim(0, padY),
			PaddingBottom: new UDim(0, padY),
			PaddingLeft: new UDim(0, padX),
			PaddingRight: new UDim(0, padX),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	});
});

export default useTableStyles;
