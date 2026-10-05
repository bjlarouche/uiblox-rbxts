import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useSpeedDialStyles = componentStyles("SpeedDial", (theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			HorizontalAlignment: Enum.HorizontalAlignment.Center,
			VerticalAlignment: Enum.VerticalAlignment.Bottom,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIListLayout>,
	}),
);

export default useSpeedDialStyles;
