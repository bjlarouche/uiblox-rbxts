import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type SpeedDialDirection = "up" | "down" | "left" | "right";

const useSpeedDialStyles = componentStyles<{ direction?: SpeedDialDirection }>(
	"SpeedDial",
	(theme: Theme, { direction = "up" }) => {
		const vertical = direction === "up" || direction === "down";
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection: vertical ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
				HorizontalAlignment:
					direction === "left"
						? Enum.HorizontalAlignment.Right
						: direction === "right"
							? Enum.HorizontalAlignment.Left
							: Enum.HorizontalAlignment.Center,
				VerticalAlignment:
					direction === "up"
						? Enum.VerticalAlignment.Bottom
						: direction === "down"
							? Enum.VerticalAlignment.Top
							: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
		});
	},
);

export default useSpeedDialStyles;
