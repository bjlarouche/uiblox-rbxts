import { controlMetrics, ControlSize, createStyles, componentStyles, Theme, WriteableStyle } from "theme";

export interface RadioGroupStyleProps {
	size?: ControlSize;
	row?: boolean;
}

const useRadioGroupStyles = componentStyles<RadioGroupStyleProps>("RadioGroup", (theme: Theme, { size, row }) => {
	const metrics = controlMetrics(theme.density, size);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: row === true ? Enum.FillDirection.Horizontal : Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.default),
			SortOrder: Enum.SortOrder.LayoutOrder,
			VerticalAlignment: Enum.VerticalAlignment.Center,
		} as WriteableStyle<UIListLayout>,
		option: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Text: "",
		} as WriteableStyle<TextButton>,
		optionRow: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.default),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		ring: {
			Size: UDim2.fromOffset(metrics.radio, metrics.radio),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		dot: {
			Size: UDim2.fromScale(0.5, 0.5),
			Position: UDim2.fromScale(0.5, 0.5),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		stroke: {
			Color: theme.palette.text.primary,
			Thickness: 1,
		} as WriteableStyle<UIStroke>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
		} as WriteableStyle<TextLabel>,
		hint: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption ?? metrics.font,
		} as WriteableStyle<TextLabel>,
		notes: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
	});
});

export default useRadioGroupStyles;
