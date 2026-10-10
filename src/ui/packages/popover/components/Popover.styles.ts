import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const usePopoverStyles = componentStyles("Popover", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		padding: {
			PaddingTop: new UDim(0, theme.spacing.calc(2)),
			PaddingBottom: new UDim(0, theme.spacing.calc(2)),
			PaddingLeft: new UDim(0, theme.spacing.calc(2)),
			PaddingRight: new UDim(0, theme.spacing.calc(2)),
		} as WriteableStyle<UIPadding>,
	}),
);

export default usePopoverStyles;
