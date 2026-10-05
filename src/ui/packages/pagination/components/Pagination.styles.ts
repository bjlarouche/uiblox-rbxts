import { ControlSize, componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const usePaginationStyles = componentStyles<{ size?: ControlSize }>("Pagination", (theme: Theme, { size = "medium" }) => {
	const box = size === "small" ? theme.spacing.calc(2.5) : size === "large" ? theme.spacing.calc(4) : theme.spacing.calc(3);
	const text =
		size === "small"
			? theme.typography.fontSizes.caption
			: size === "large"
				? theme.typography.fontSizes.h6
				: theme.typography.fontSizes.body;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(size === "small" ? 0.25 : 0.5)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		page: {
			Size: UDim2.fromOffset(box, box),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Font: theme.typography.fontFamilies.default,
			TextSize: text,
			TextColor3: theme.palette.text.primary,
		} as WriteableStyle<TextButton>,
		selected: {
			BackgroundColor3: theme.palette.action.selected,
		} as WriteableStyle<TextButton>,
		ellipsis: {
			Size: UDim2.fromOffset(box, box),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: text,
			TextColor3: theme.palette.text.secondary,
			Text: "…",
		} as WriteableStyle<TextLabel>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
	});
});

export default usePaginationStyles;
