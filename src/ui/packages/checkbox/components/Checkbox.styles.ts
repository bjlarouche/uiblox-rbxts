import { controlMetrics, ControlSize, createStyles, componentStyles, WriteableStyle } from "theme";

export interface CheckboxStyleProps {
	size?: ControlSize;
}

const useCheckboxStyles = componentStyles<CheckboxStyleProps>("Checkbox", (theme, { size }) => {
	const metrics = controlMetrics(theme.density, size);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
			Text: "",
		} as WriteableStyle<TextButton>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.default),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		box: {
			Size: UDim2.fromOffset(metrics.checkbox, metrics.checkbox),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		mark: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.primary.on,
			Font: theme.typography.fontFamilies.semibold,
			TextSize: metrics.markFont,
			TextXAlignment: Enum.TextXAlignment.Center,
			TextYAlignment: Enum.TextYAlignment.Center,
		} as WriteableStyle<TextLabel>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			Size: UDim2.fromScale(0, 0),
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Center,
		} as WriteableStyle<TextLabel>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Thickness: 1,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		fill: {
			BackgroundColor3: theme.palette.primary.main,
		} as WriteableStyle<Frame>,
		activeStroke: {
			Color: theme.palette.primary.main,
		} as WriteableStyle<UIStroke>,
		idleStroke: {
			Color: theme.palette.text.secondary,
		} as WriteableStyle<UIStroke>,
	});
});

export default useCheckboxStyles;
