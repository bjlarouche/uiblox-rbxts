import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useSkeletonStyles = componentStyles("Skeleton", (theme: Theme) =>
	createStyles({
		block: {
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: 0,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		highlight: {
			Color: new ColorSequence([
				new ColorSequenceKeypoint(0, theme.palette.action.hover),
				new ColorSequenceKeypoint(0.5, theme.palette.text.secondary),
				new ColorSequenceKeypoint(1, theme.palette.action.hover),
			]),
			Transparency: new NumberSequence([
				new NumberSequenceKeypoint(0, 0.35),
				new NumberSequenceKeypoint(0.5, 0),
				new NumberSequenceKeypoint(1, 0.35),
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
