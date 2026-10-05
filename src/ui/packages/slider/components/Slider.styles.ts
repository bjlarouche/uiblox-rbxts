import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useSliderStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		track: {
			Size: new UDim2(1, 0, 0, theme.padding.calc(2)),
			Position: UDim2.fromScale(0, 0.5),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundColor3: theme.palette.divider,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		fill: {
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		knob: {
			Size: UDim2.fromOffset(theme.spacing.calc(1.5), theme.spacing.calc(1.5)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundColor3: theme.palette.text.primary,
			BorderSizePixel: 0,
			ZIndex: 2,
		} as WriteableStyle<Frame>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.secondary.main,
			Thickness: 2,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	}),
);

export default useSliderStyles;
