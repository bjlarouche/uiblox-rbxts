import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const usePaperStyles = componentStyles<{ elevation?: "flat" | "raised" | "outlined" }>(
	"Paper",
	(theme: Theme, { elevation = "flat" }) => {
	const pad = theme.spacing.calc(2);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3: elevation === "raised" ? theme.palette.surface.elevated : theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			Thickness: 1,
			Transparency: 0,
		} as WriteableStyle<UIStroke>,
		content: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		padding: {
			PaddingTop: new UDim(0, pad),
			PaddingBottom: new UDim(0, pad),
			PaddingLeft: new UDim(0, pad),
			PaddingRight: new UDim(0, pad),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	});
	},
);

export default usePaperStyles;
