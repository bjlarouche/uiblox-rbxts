import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const usePaperStyles = componentStyles<{ elevation?: "flat" | "raised" | "outlined" }>(
	"Paper",
	(theme: Theme, { elevation = "flat" }) =>
	createStyles({
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
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(2)),
			PaddingBottom: new UDim(0, theme.padding.calc(2)),
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	}),
);

export default usePaperStyles;
