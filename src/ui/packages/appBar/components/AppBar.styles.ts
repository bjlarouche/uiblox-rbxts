import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type AppBarElevation = "flat" | "raised";

const useAppBarStyles = componentStyles<{ elevation?: AppBarElevation; hasActions?: boolean }>(
	"AppBar",
	(theme: Theme, { elevation = "raised", hasActions = false }) =>
		createStyles({
			root: {
				Size: new UDim2(1, 0, 0, theme.spacing.calc(7)),
				BackgroundColor3: elevation === "raised" ? theme.palette.surface.elevated : theme.palette.surface.paper,
				BorderSizePixel: 0,
				ZIndex: 11000,
			} as WriteableStyle<Frame>,
			padding: {
				PaddingLeft: new UDim(0, theme.padding.calc(2)),
				PaddingRight: new UDim(0, theme.padding.calc(2)),
			} as WriteableStyle<UIPadding>,
			title: {
				Size: new UDim2(1, hasActions ? -theme.spacing.calc(8) : 0, 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.h3 ?? theme.typography.fontSizes.body,
				TextColor3: theme.palette.text.primary,
				TextXAlignment: Enum.TextXAlignment.Left,
				TextYAlignment: Enum.TextYAlignment.Center,
				TextTruncate: Enum.TextTruncate.AtEnd,
			} as WriteableStyle<TextLabel>,
			actions: {
				AutomaticSize: Enum.AutomaticSize.X,
				Size: new UDim2(0, 0, 1, 0),
				Position: new UDim2(1, 0, 0, 0),
				AnchorPoint: new Vector2(1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ZIndex: 2,
			} as WriteableStyle<Frame>,
			actionsLayout: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Right,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
		}),
);

export default useAppBarStyles;
