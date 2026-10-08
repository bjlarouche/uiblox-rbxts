import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useCollapseStyles = componentStyles("Collapse", (_theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ClipsDescendants: true,
		} as WriteableStyle<Frame>,
	}),
);

export default useCollapseStyles;
