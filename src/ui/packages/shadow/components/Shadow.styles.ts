import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useShadowStyles = componentStyles("Shadow", (theme: Theme) =>
	createStyles({
		container: {
			Size: UDim2.fromOffset(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: -100,
		} as WriteableStyle<Frame>,
		blob: {
			BackgroundColor3: theme.palette.shadow,
			BackgroundTransparency: 0.8,
			BorderSizePixel: 0,
			Position: UDim2.fromOffset(theme.spacing.calc(0.25), theme.spacing.calc(0.25)),
		} as WriteableStyle<Frame>,
	}),
);

export default useShadowStyles;
