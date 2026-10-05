import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const usePaginationStyles = componentStyles("Pagination", (theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(0.5)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		page: {
			Size: UDim2.fromOffset(theme.spacing.calc(3), theme.spacing.calc(3)),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
		} as WriteableStyle<TextButton>,
		selected: {
			BackgroundColor3: theme.palette.action.selected,
		} as WriteableStyle<TextButton>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
	}),
);

export default usePaginationStyles;
