import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type AppBarElevation = "flat" | "raised";
export type AppBarColor = "default" | "primary";

const useAppBarStyles = componentStyles<{ elevation?: AppBarElevation; color?: AppBarColor; hasActions?: boolean }>(
	"AppBar",
	(theme: Theme, { elevation = "raised", color = "default", hasActions = false }) => {
		const heading = theme.typography.variants.h6;
		const pad = theme.padding.calc(2);
		return createStyles({
			root: {
				Size: new UDim2(1, 0, 0, theme.spacing.calc(7)),
				BackgroundColor3:
					color === "primary"
						? theme.palette.primary.main
						: elevation === "raised"
							? theme.palette.surface.elevated
							: theme.palette.surface.paper,
				BorderSizePixel: 0,
				ZIndex: 11000,
			} as WriteableStyle<Frame>,
			divider: {
				AnchorPoint: new Vector2(0, 1),
				Position: UDim2.fromScale(0, 1),
				Size: new UDim2(1, 0, 0, 1),
				BackgroundColor3: theme.palette.border,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			inset: {
				Position: new UDim2(0, pad, 0, 0),
				Size: new UDim2(1, -(pad * 2), 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			row: {
				FillDirection: Enum.FillDirection.Horizontal,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				HorizontalFlex: Enum.UIFlexAlignment.SpaceBetween,
				SortOrder: Enum.SortOrder.LayoutOrder,
			} as WriteableStyle<UIListLayout>,
			title: {
				LayoutOrder: 1,
				AutomaticSize: Enum.AutomaticSize.None,
				Size: hasActions ? new UDim2(0, 0, 1, 0) : new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies[heading.family],
				TextSize: heading.size,
				LineHeight: heading.leading,
				TextColor3: color === "primary" ? theme.palette.primary.on : theme.palette.text.primary,
				TextXAlignment: Enum.TextXAlignment.Left,
				TextYAlignment: Enum.TextYAlignment.Center,
				TextTruncate: Enum.TextTruncate.AtEnd,
			} as WriteableStyle<TextLabel>,
			titles: {
				LayoutOrder: 1,
				AutomaticSize: hasActions ? Enum.AutomaticSize.None : Enum.AutomaticSize.Y,
				Size: hasActions ? new UDim2(0, 0, 1, 0) : new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			subtitle: {
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, 0, 0, 0),
				TextWrapped: true,
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
				TextColor3: color === "primary" ? theme.palette.primary.on : theme.palette.text.secondary,
				TextXAlignment: Enum.TextXAlignment.Left,
			} as WriteableStyle<TextLabel>,
			actions: {
				LayoutOrder: 2,
				AutomaticSize: Enum.AutomaticSize.X,
				Size: new UDim2(0, 0, 1, 0),
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
		});
	},
);

export default useAppBarStyles;
