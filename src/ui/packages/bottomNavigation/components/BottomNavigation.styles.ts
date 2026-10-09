import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useBottomNavigationStyles = componentStyles<{ showLabels?: boolean }>(
	"BottomNavigation",
	(theme: Theme, { showLabels = true }) =>
		createStyles({
			root: {
				Size: new UDim2(1, 0, 0, theme.spacing.calc(showLabels === false ? 5 : 7)),
				BackgroundColor3: theme.palette.surface.elevated,
				BorderSizePixel: 0,
				ZIndex: 11000,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Center,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, 0),
			} as WriteableStyle<UIListLayout>,
			item: {
				Size: new UDim2(0, 0, 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
				TextColor3: theme.palette.text.secondary,
				TextTruncate: Enum.TextTruncate.AtEnd,
			} as WriteableStyle<TextButton>,
			selected: {
				TextColor3: theme.palette.text.primary,
				BackgroundColor3: theme.palette.action.selected,
				BackgroundTransparency: 0.85,
			} as WriteableStyle<TextButton>,
			disabledItem: {
				TextTransparency: 0.5,
			} as WriteableStyle<TextButton>,
			indicator: {
				Size: new UDim2(1, -theme.padding.calc(3), 0, 2),
				Position: new UDim2(0.5, 0, 0, theme.padding.calc(0.5)),
				AnchorPoint: new Vector2(0.5, 0),
				BackgroundColor3: theme.palette.primary.main,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			badge: {
				AnchorPoint: new Vector2(1, 0),
				Position: new UDim2(1, -4, 0, 2),
				AutomaticSize: Enum.AutomaticSize.X,
				Size: UDim2.fromOffset(0, theme.spacing.calc(2)),
				BackgroundColor3: theme.palette.status.error.main,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption,
				TextColor3: theme.palette.text.inverse,
				TextXAlignment: Enum.TextXAlignment.Center,
				ZIndex: 2,
			} as WriteableStyle<TextLabel>,
			badgePad: {
				PaddingLeft: new UDim(0, theme.padding.calc(0.5)),
				PaddingRight: new UDim(0, theme.padding.calc(0.5)),
			} as WriteableStyle<UIPadding>,
			badgeCorner: {
				CornerRadius: new UDim(0, theme.spacing.calc(1)),
			} as WriteableStyle<UICorner>,
		}),
);

export default useBottomNavigationStyles;
