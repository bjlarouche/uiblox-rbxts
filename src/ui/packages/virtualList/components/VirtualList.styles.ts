import { createStyles, componentStyles, WriteableStyle } from "theme";

const useVirtualListStyles = componentStyles("VirtualList", () =>
	createStyles({
		root: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScrollBarThickness: 6,
			ScrollingDirection: Enum.ScrollingDirection.Y,
			AutomaticCanvasSize: Enum.AutomaticSize.None,
			CanvasSize: UDim2.fromScale(0, 0),
			ClipsDescendants: true,
		} as WriteableStyle<ScrollingFrame>,
		item: {
			Position: UDim2.fromOffset(0, 0),
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
	}),
);

export default useVirtualListStyles;
