import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { tabIndicatorBox } from "./tabIndicator";
import { TabsOrientation, tabsIsVertical } from "./tabsOrientation";

const useTabsStyles = componentStyles<{ orientation?: TabsOrientation; centered?: boolean }>("Tabs", (theme: Theme, { orientation, centered }) => {
	const vertical = tabsIsVertical(orientation);
	const bar = theme.padding.calc(0.5);
	const gutter = theme.padding.calc(2);
	const mark = tabIndicatorBox(vertical, bar, gutter);
	return createStyles({
		root: {
			Size: vertical
				? new UDim2(0, theme.spacing.calc(16), 1, 0)
				: new UDim2(1, 0, 0, theme.spacing.calc(4)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			CanvasSize: UDim2.fromScale(0, 0),
			AutomaticCanvasSize: vertical ? Enum.AutomaticSize.Y : Enum.AutomaticSize.X,
			ScrollingDirection: vertical ? Enum.ScrollingDirection.Y : Enum.ScrollingDirection.X,
			HorizontalScrollBarInset: Enum.ScrollBarInset.Always,
			VerticalScrollBarInset: Enum.ScrollBarInset.Always,
			ScrollBarThickness: theme.padding.calc(0.5),
			ScrollBarImageColor3: theme.palette.text.secondary,
		} as WriteableStyle<ScrollingFrame>,
		list: {
			FillDirection: vertical ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
			HorizontalAlignment: centered === true && vertical !== true ? Enum.HorizontalAlignment.Center : Enum.HorizontalAlignment.Left,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		tab: {
			AutomaticSize: vertical ? Enum.AutomaticSize.Y : Enum.AutomaticSize.X,
			Size: vertical ? new UDim2(1, 0, 0, 0) : UDim2.fromScale(0, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: vertical ? Enum.TextXAlignment.Left : Enum.TextXAlignment.Center,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextButton>,
		cap: {
			MaxSize: new Vector2(vertical ? math.huge : theme.spacing.calc(16), math.huge),
		} as WriteableStyle<UISizeConstraint>,
		selected: {
			TextColor3: theme.palette.text.primary,
		} as WriteableStyle<TextButton>,
		disabledTab: {
			TextTransparency: 0.5,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
			PaddingTop: new UDim(0, vertical ? theme.padding.calc(1) : 0),
			PaddingBottom: new UDim(0, vertical ? theme.padding.calc(1) : 0),
		} as WriteableStyle<UIPadding>,
		indicator: {
			Size: new UDim2(mark.widthScale, mark.widthOffset, mark.heightScale, mark.heightOffset),
			Position: vertical ? new UDim2(0, 0, 0.5, 0) : UDim2.fromScale(0.5, 1),
			AnchorPoint: vertical ? new Vector2(0, 0.5) : new Vector2(0.5, 1),
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
	});
});

export default useTabsStyles;
