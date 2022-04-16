import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useProgressBarStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 110001,
		} as WriteableStyle<Frame>,
		outer: {
			Size: new UDim2(1, 0, 1, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 110001,
		} as WriteableStyle<Frame>,
		stroke: {
			Thickness: theme.options.constants.borders.divider,
			Color: theme.palette.text.primary,
		} as WriteableStyle<UIStroke>,
		inner: {
			Size: new UDim2(
				1,
				-theme.options.constants.borders.divider * 2,
				1,
				-theme.options.constants.borders.divider * 2,
			),
			Position: new UDim2(0.5, 0, 0.5, 0),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ClipsDescendants: true,
			ZIndex: 110001,
		} as WriteableStyle<Frame>,
		fill: {
			Position: new UDim2(0, 0, 0.5, 0),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundColor3: theme.palette.text.primary,
			BorderSizePixel: 0,
			ZIndex: 110001,
		} as WriteableStyle<Frame>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	}),
);

export default useProgressBarStyles;
