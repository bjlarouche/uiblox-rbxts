import { controlMetrics, ControlSize, createStyles, componentStyles, Theme, WriteableStyle } from "theme";

export type SliderColor = "primary" | "accent";

export interface SliderStyleProps {
	size?: ControlSize;
	color?: SliderColor;
}

const useSliderStyles = componentStyles<SliderStyleProps>("Slider", (theme: Theme, { size, color = "primary" }) => {
	const metrics = controlMetrics(theme.density, size);
	const tone = color === "accent" ? theme.palette.accent.main : theme.palette.primary.main;
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
			BackgroundColor3: tone,
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
		mark: {
			Size: new UDim2(0, 2, 0, metrics.sliderTrack + 4),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundColor3: theme.palette.text.secondary,
			BackgroundTransparency: 0.35,
			BorderSizePixel: 0,
			ZIndex: 1,
		} as WriteableStyle<Frame>,
	});
});

export default useSliderStyles;
