import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { skeletonTone } from "./skeletonTone";

const useSkeletonStyles = componentStyles("Skeleton", (theme: Theme) => {
	const { bone, shine } = skeletonTone(theme);
	return createStyles({
		block: {
			BackgroundColor3: bone,
			BackgroundTransparency: 0,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		highlight: {
			Color: new ColorSequence([
				new ColorSequenceKeypoint(0, bone),
				new ColorSequenceKeypoint(0.5, shine),
				new ColorSequenceKeypoint(1, bone),
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
	});
});

export default useSkeletonStyles;
