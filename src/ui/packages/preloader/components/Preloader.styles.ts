import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { PreloaderProps } from "./Preloader";

const usePreloaderStyles = makeStyles<PreloaderProps>((theme: Theme, props: PreloaderProps) => {
	return createStyles({
		container: {
			Size: new UDim2(1, 0, 1, 0),
			BackgroundColor3: theme.palette.background.default,
			BorderSizePixel: 0,
			ZIndex: 100000,
		} as WriteableStyle<Frame>,
		logo: {
			Size: new UDim2(0.33, 0, 0.33, 0),
			Position: new UDim2(0.5, 0, 0.4, 0),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Image: props.icon,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 110000,
		} as WriteableStyle<ImageLabel>,
		label: {
			Size: new UDim2(0.33, 0, 0, theme.spacing.calc(2)),
			Position: new UDim2(0.5, 0, 0.73, theme.spacing.calc(2) + theme.padding.calc(4)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextSize: theme.typography.fontSizes.h3,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.bold,
			TextScaled: false,
			ZIndex: 110000,
		} as WriteableStyle<TextLabel>,
		progressBar: {
			Size: new UDim2(0.33, 0, 0, theme.spacing.calc(2)),
			Position: new UDim2(0.5, 0, 0.74, theme.padding.calc(2)),
			AnchorPoint: new Vector2(0.5, 0.5),
			ZIndex: 110000,
		} as WriteableStyle<Frame>,
	});
});

export default usePreloaderStyles;
