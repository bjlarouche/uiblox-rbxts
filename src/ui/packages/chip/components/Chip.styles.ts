import { componentStyles, ControlSize, controlMetrics, createStyles, Theme, WriteableStyle } from "theme";

const useChipStyles = componentStyles<{
	selected?: boolean;
	disabled?: boolean;
	deletable?: boolean;
	size?: ControlSize;
}>("Chip", (theme: Theme, { selected = false, disabled = false, deletable = false, size }) => {
	const metrics = controlMetrics(theme.density, size);
	const padY = size === "small" ? 0.25 : size === "large" ? 0.75 : 0.5;
	const padX = size === "small" ? 1 : size === "large" ? 2 : 1.5;
	const deletePx = metrics.icon;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3: selected ? theme.palette.action.selected : theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Active: !disabled,
			Selectable: !disabled,
			TextColor3: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(padY)),
			PaddingBottom: new UDim(0, theme.padding.calc(padY)),
			PaddingLeft: new UDim(0, theme.padding.calc(padX)),
			PaddingRight: new UDim(0, theme.padding.calc(deletable ? 0.5 : padX)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(theme.shape.pillScale, 0),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			Transparency: selected ? 1 : 0,
		} as WriteableStyle<UIStroke>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.padding.calc(0.5)),
		} as WriteableStyle<UIListLayout>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextColor3: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			LayoutOrder: 1,
		} as WriteableStyle<TextLabel>,
		delete: {
			Size: UDim2.fromOffset(deletePx, deletePx),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			ImageColor3: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
			LayoutOrder: 2,
		} as WriteableStyle<ImageButton>,
	});
});

export default useChipStyles;
