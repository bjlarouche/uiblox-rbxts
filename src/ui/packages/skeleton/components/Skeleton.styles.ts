import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useSkeletonStyles = makeStyles((theme: Theme) =>
	createStyles({
		block: {
			BackgroundColor3: theme.palette.surface.paper,
			BackgroundTransparency: 0,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		highlight: {
			Color: new ColorSequence([
				new ColorSequenceKeypoint(0, theme.palette.surface.paper),
				new ColorSequenceKeypoint(0.5, theme.palette.text.secondary),
				new ColorSequenceKeypoint(1, theme.palette.surface.paper),
			]),
		} as WriteableStyle<UIGradient>,
		rounded: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		circular: {
			CornerRadius: new UDim(0.5, 0),
		} as WriteableStyle<UICorner>,
	}),
);

export default useSkeletonStyles;
