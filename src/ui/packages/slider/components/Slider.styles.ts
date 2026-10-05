import { controlMetrics, ControlSize, createStyles, componentStyles, Theme, WriteableStyle } from "theme";

export interface SliderStyleProps {
	size?: ControlSize;
}

const useSliderStyles = componentStyles<SliderStyleProps>("Slider", (theme: Theme, { size }) => {
	const metrics = controlMetrics(theme.density, size);
	return createStyles({
		root: {
			Size: new UDim2(1, 0, 0, metrics.sliderHeight),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		track: {
			Size: new UDim2(1, 0, 0, metrics.sliderTrack),
			Position: UDim2.fromScale(0, 0.5),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundColor3: theme.palette.action.disabled,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		fill: {
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		knob: {
			Size: UDim2.fromOffset(metrics.sliderKnob, metrics.sliderKnob),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundColor3: theme.palette.text.primary,
			BorderSizePixel: 0,
			ZIndex: 2,
		} as WriteableStyle<Frame>,
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

export default useSliderStyles;
