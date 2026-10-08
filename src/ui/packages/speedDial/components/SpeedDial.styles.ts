import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type SpeedDialDirection = "up" | "down" | "left" | "right";

const useSpeedDialStyles = componentStyles<{ direction?: SpeedDialDirection; labeled?: boolean }>(
	"SpeedDial",
	(theme: Theme, { direction = "up", labeled = false }) => {
		const vertical = direction === "up" || direction === "down";
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection: vertical ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
				HorizontalAlignment:
					vertical && labeled
						? Enum.HorizontalAlignment.Right
						: direction === "left"
							? Enum.HorizontalAlignment.Right
							: direction === "right"
								? Enum.HorizontalAlignment.Left
								: Enum.HorizontalAlignment.Center,
				VerticalAlignment:
					direction === "up"
						? Enum.VerticalAlignment.Bottom
						: direction === "down"
							? Enum.VerticalAlignment.Top
							: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
			action: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			actionRow: {
				FillDirection: Enum.FillDirection.Horizontal,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
			actionLabel: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundColor3: theme.palette.surface.paper,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
				TextColor3: theme.palette.text.primary,
			} as WriteableStyle<TextLabel>,
			actionPad: {
				PaddingLeft: new UDim(0, theme.padding.calc(1)),
				PaddingRight: new UDim(0, theme.padding.calc(1)),
				PaddingTop: new UDim(0, theme.padding.calc(0.5)),
				PaddingBottom: new UDim(0, theme.padding.calc(0.5)),
			} as WriteableStyle<UIPadding>,
			actionCorner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
		});
	},
);

export default useSpeedDialStyles;
