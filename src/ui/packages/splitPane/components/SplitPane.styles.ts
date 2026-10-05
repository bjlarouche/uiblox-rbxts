import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useSplitPaneStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		body: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		pane: {
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ClipsDescendants: true,
		} as WriteableStyle<Frame>,
		divider: {
			BackgroundColor3: theme.palette.text.primary,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		rule: {
			BackgroundColor3: theme.palette.divider,
			BorderSizePixel: 0,
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: UDim2.fromScale(0.5, 0.5),
		} as WriteableStyle<Frame>,
		grip: {
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: UDim2.fromScale(0.5, 0.5),
		} as WriteableStyle<Frame>,
		mark: {
			BackgroundColor3: theme.options.constants.colors.textMuted,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		overlay: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Active: true,
			ZIndex: 20000,
		} as WriteableStyle<Frame>,
	}),
);

export default useSplitPaneStyles;
