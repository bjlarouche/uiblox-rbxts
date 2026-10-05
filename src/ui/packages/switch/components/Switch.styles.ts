import { controlMetrics, ControlSize, createStyles, componentStyles, Theme, WriteableStyle } from "theme";

export interface SwitchStyleProps {
	size?: ControlSize;
}

const useSwitchStyles = componentStyles<SwitchStyleProps>("Switch", (theme: Theme, { size }) => {
	const metrics = controlMetrics(theme.density, size);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
			Text: "",
			AutoButtonColor: false,
		} as WriteableStyle<TextButton>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.default),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		track: {
			Size: UDim2.fromOffset(metrics.switchTrackW, metrics.switchTrackH),
			BackgroundColor3: theme.palette.action.disabled,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		trackOn: {
			BackgroundColor3: theme.palette.primary.main,
		} as WriteableStyle<Frame>,
		knob: {
			Size: UDim2.fromOffset(metrics.switchThumb, metrics.switchThumb),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ZIndex: 2,
		} as WriteableStyle<Frame>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			Size: UDim2.fromScale(0, 0),
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextWrapped: true,
		} as WriteableStyle<TextLabel>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.focus,
			Thickness: 2,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	});
});

export default useSwitchStyles;
