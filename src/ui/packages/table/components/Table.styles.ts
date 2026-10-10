import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useTableStyles = componentStyles<{ dense?: boolean }>("Table", (theme: Theme, { dense }) => {
	const padY = theme.padding.calc(dense === true ? 0.5 : 1);
	const padX = theme.padding.calc(dense === true ? 1 : 1.5);
	const heading = theme.typography.variants.h6;
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
		hover: {
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		header: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		rowStroke: {
			Color: theme.palette.divider,
			Thickness: 1,
			Transparency: 0,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
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
			Font: theme.typography.fontFamilies[heading.family],
			TextSize: heading.size,
			LineHeight: heading.leading,
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextLabel>,
		band: {
			Position: new UDim2(0, padX, 0, padY),
			Size: new UDim2(1, -(padX * 2), 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		tail: {
			PaddingBottom: new UDim(0, padY),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	});
});

export default useTableStyles;
