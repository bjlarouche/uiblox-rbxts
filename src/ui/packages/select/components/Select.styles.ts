import { controlMetrics, ControlSize, createStyles, componentStyles, Theme, WriteableStyle } from "theme";

export interface SelectStyleProps {
	size?: ControlSize;
}

const useSelectStyles = componentStyles<SelectStyleProps>("Select", (theme: Theme, { size }) => {
	const metrics = controlMetrics(theme.density, size);
	return createStyles({
		root: {
			Size: UDim2.fromOffset(theme.spacing.calc(12), metrics.height),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		trigger: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
		} as WriteableStyle<TextButton>,
		placeholder: {
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingLeft: new UDim(0, theme.padding.calc(1.5)),
			PaddingRight: new UDim(0, theme.padding.calc(1.5)),
		} as WriteableStyle<UIPadding>,
		menu: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ZIndex: 20001,
		} as WriteableStyle<Frame>,
		search: {
			Size: new UDim2(1, 0, 0, metrics.height),
			BackgroundTransparency: 1,
			ZIndex: 20002,
		} as WriteableStyle<Frame>,
		list: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ScrollBarThickness: theme.padding.default,
			ScrollBarImageColor3: theme.palette.text.secondary,
			ScrollingDirection: Enum.ScrollingDirection.Y,
			ZIndex: 20001,
		} as WriteableStyle<ScrollingFrame>,
		option: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextTruncate: Enum.TextTruncate.AtEnd,
			ZIndex: 20002,
		} as WriteableStyle<TextButton>,
		highlighted: {
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		selected: {
			BackgroundColor3: theme.palette.action.selected,
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		group: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			ZIndex: 20002,
		} as WriteableStyle<TextLabel>,
		disabledOption: {
			TextTransparency: 0.5,
		} as WriteableStyle<TextButton>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		focusStroke: {
			Color: theme.palette.focus,
			Thickness: 2,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	});
});


export default useSelectStyles;
