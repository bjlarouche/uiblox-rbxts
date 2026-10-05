import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useRatingStyles = componentStyles<{ disabled?: boolean }>("Rating", (theme: Theme, { disabled = false }) =>
	createStyles({
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
			Padding: new UDim(0, theme.padding.calc(0.5)),
		} as WriteableStyle<UIListLayout>,
		star: {
			Size: UDim2.fromOffset(theme.spacing.calc(3), theme.spacing.calc(3)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Active: !disabled,
			Selectable: !disabled,
			ImageColor3: disabled ? theme.palette.text.disabled : theme.palette.primary.main,
		} as WriteableStyle<ImageButton>,
	}),
);

export default useRatingStyles;
