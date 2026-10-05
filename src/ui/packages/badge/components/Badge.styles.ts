import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useBadgeStyles = componentStyles("Badge", (theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		badge: {
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: UDim2.fromScale(1, 0),
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromOffset(theme.padding.calc(2), theme.padding.calc(2)),
			BackgroundColor3: theme.palette.status.error.main,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: theme.palette.text.inverse,
			ZIndex: 2,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.calc(0.5)),
			PaddingRight: new UDim(0, theme.padding.calc(0.5)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
	}),
);

export default useBadgeStyles;
