import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useTabsStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2.5)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			CanvasSize: UDim2.fromScale(0, 0),
			AutomaticCanvasSize: Enum.AutomaticSize.X,
			ScrollingDirection: Enum.ScrollingDirection.X,
			HorizontalScrollBarInset: Enum.ScrollBarInset.Always,
			ScrollBarThickness: theme.padding.calc(0.5),
			ScrollBarImageColor3: theme.palette.text.secondary,
		} as WriteableStyle<ScrollingFrame>,
		list: {
			FillDirection: Enum.FillDirection.Horizontal,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		tab: {
			AutomaticSize: Enum.AutomaticSize.X,
			Size: UDim2.fromScale(0, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
		} as WriteableStyle<TextButton>,
		selected: {
			TextColor3: theme.palette.text.primary,
		} as WriteableStyle<TextButton>,
		disabledTab: {
			TextTransparency: 0.5,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
		indicator: {
			Size: new UDim2(1, theme.padding.calc(4), 0, theme.padding.calc(0.5)),
			Position: UDim2.fromScale(0.5, 1),
			AnchorPoint: new Vector2(0.5, 1),
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
	}),
);

export default useTabsStyles;
