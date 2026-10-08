import { controlMetrics, ControlSize, createStyles, componentStyles, focusRing, Theme, WriteableStyle } from "theme";

export type SliderColor = "primary" | "accent";

export interface SliderStyleProps {
	size?: ControlSize;
	color?: SliderColor;
	labeled?: boolean;
}

const useSliderStyles = componentStyles<SliderStyleProps>("Slider", (theme: Theme, { size, color = "primary", labeled = false }) => {
	const metrics = controlMetrics(theme.density, size);
	const tone = color === "accent" ? theme.palette.accent.main : theme.palette.primary.main;
	const caption = theme.typography.variants.caption;
	return createStyles({
		root: {
			Size: new UDim2(1, 0, 0, metrics.sliderHeight),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		track: {
			Size: new UDim2(1, labeled ? -56 : 0, 0, metrics.sliderTrack),
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
		stroke: focusRing(theme.palette.focus) as WriteableStyle<UIStroke>,
		label: {
			Size: new UDim2(0, 52, 1, 0),
			Position: UDim2.fromScale(1, 0.5),
			AnchorPoint: new Vector2(1, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies[caption.family],
			TextSize: caption.size,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Right,
			TextYAlignment: Enum.TextYAlignment.Center,
		} as WriteableStyle<TextLabel>,
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
