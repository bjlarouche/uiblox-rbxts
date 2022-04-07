import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useShadowStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			Size: new UDim2(1, theme.spacing.calc(0.25), 1, theme.spacing.calc(0.25)),
			BackgroundColor3: theme.options.constants.colors.backgroundUIContrast,
			BackgroundTransparency: 0.8,
			BorderSizePixel: 0,
			ZIndex: -100,
		} as WriteableStyle<Frame>,
	}),
);

export default useShadowStyles;
