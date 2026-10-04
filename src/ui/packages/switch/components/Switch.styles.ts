import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { SwitchProps } from "./Switch";

const useSwitchStyles = makeStyles<SwitchProps>((theme: Theme, props: SwitchProps) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
			Text: "",
		} as WriteableStyle<TextButton>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.default),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		track: {
			Size: UDim2.fromOffset(theme.spacing.calc(4), theme.spacing.calc(2)),
			BackgroundColor3: props.value ? theme.palette.primary.main : theme.palette.divider,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		knob: {
			Size: UDim2.fromOffset(theme.spacing.calc(1.5), theme.spacing.calc(1.5)),
			Position: new UDim2(props.value ? 1 : 0, props.value ? -2 : 2, 0.5, 0),
			AnchorPoint: new Vector2(props.value ? 1 : 0, 0.5),
			BackgroundColor3: theme.palette.background.default,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			Size: UDim2.fromScale(0, 0),
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
		} as WriteableStyle<TextLabel>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
	}),
);

export default useSwitchStyles;
