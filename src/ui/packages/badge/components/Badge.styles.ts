import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type BadgeColor = "error" | "primary" | "success";

const useBadgeStyles = componentStyles<{ variant?: "standard" | "dot"; color?: BadgeColor }>(
	"Badge",
	(theme: Theme, { variant = "standard", color = "error" }) => {
	const diameter = variant === "dot" ? theme.spacing.calc(1) : theme.spacing.calc(2) + theme.padding.calc(1);
	const tone =
		color === "primary"
			? theme.palette.primary
			: color === "success"
				? theme.palette.status.success
				: theme.palette.status.error;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		badge: {
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: UDim2.fromScale(1, 0),
			AutomaticSize: variant === "dot" ? Enum.AutomaticSize.None : Enum.AutomaticSize.X,
			Size: UDim2.fromOffset(diameter, diameter),
			BackgroundColor3: tone.main,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: color === "error" ? theme.palette.text.inverse : tone.on,
			TextXAlignment: Enum.TextXAlignment.Center,
			TextYAlignment: Enum.TextYAlignment.Center,
			ZIndex: 2,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingLeft: new UDim(0, variant === "dot" ? 0 : theme.padding.calc(0.5)),
			PaddingRight: new UDim(0, variant === "dot" ? 0 : theme.padding.calc(0.5)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0.5, 0),
		} as WriteableStyle<UICorner>,
	});
});

export default useBadgeStyles;
