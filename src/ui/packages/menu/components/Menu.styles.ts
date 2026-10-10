import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useMenuStyles = componentStyles("Menu", (theme: Theme) =>
	createStyles({
		surface: {
			Position: UDim2.fromOffset(1, 1),
			Size: new UDim2(1, -2, 0, 0),
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
		inset: {
			PaddingTop: new UDim(0, theme.shape.borderRadius),
			PaddingBottom: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UIPadding>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
	}),
);

export default useMenuStyles;
