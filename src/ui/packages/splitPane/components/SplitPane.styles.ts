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
			BackgroundColor3: theme.palette.divider,
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		dragging: {
			BackgroundColor3: theme.palette.primary.main,
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
