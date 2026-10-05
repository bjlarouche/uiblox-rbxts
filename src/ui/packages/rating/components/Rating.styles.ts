import { ControlSize, componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useRatingStyles = componentStyles<{ disabled?: boolean; size?: ControlSize }>(
	"Rating",
	(theme: Theme, { disabled = false, size = "medium" }) => {
		const star =
			size === "small" ? theme.spacing.calc(2) : size === "large" ? theme.spacing.calc(4) : theme.spacing.calc(3);
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(size === "small" ? 0.25 : 0.5)),
			} as WriteableStyle<UIListLayout>,
			star: {
				Size: UDim2.fromOffset(star, star),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				Active: !disabled,
				Selectable: !disabled,
				ImageColor3: disabled ? theme.palette.text.disabled : theme.palette.primary.main,
			} as WriteableStyle<ImageButton>,
		});
	},
);

export default useRatingStyles;
