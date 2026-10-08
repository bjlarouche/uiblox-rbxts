import { componentStyles, controlMetrics, ControlSize, createStyles, Theme, WriteableStyle } from "theme";

const useButtonGroupStyles = componentStyles<{ size?: ControlSize }>("ButtonGroup", (theme: Theme, { size }) => {
	const metrics = controlMetrics(theme.density, size);
	const button = theme.typography.variants.button;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
			ClipsDescendants: true,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Horizontal,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, 0),
		} as WriteableStyle<UIListLayout>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			Thickness: 1,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		item: {
			AutomaticSize: Enum.AutomaticSize.X,
			Size: new UDim2(0, 0, 0, metrics.buttonHeight),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Font: theme.typography.fontFamilies[button.family],
			TextSize: button.size,
			TextColor3: theme.palette.text.primary,
		} as WriteableStyle<TextButton>,
		pad: {
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
		rule: {
			Size: new UDim2(0, 1, 0, metrics.buttonHeight),
			BackgroundColor3: theme.palette.border,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
	});
});

export default useButtonGroupStyles;
