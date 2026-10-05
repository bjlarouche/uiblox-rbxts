import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useSwitchStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Size: UDim2.fromScale(0, 0),
			Text: "",
			AutoButtonColor: false,
		} as WriteableStyle<TextButton>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.default),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		track: {
			Size: UDim2.fromOffset(theme.spacing.calc(5), theme.spacing.calc(3)),
			BackgroundColor3: theme.palette.divider,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		trackOn: {
			BackgroundColor3: theme.palette.primary.main,
		} as WriteableStyle<Frame>,
		knob: {
			Size: UDim2.fromOffset(theme.spacing.calc(2.5), theme.spacing.calc(2.5)),
			BackgroundColor3: theme.palette.background.default,
			BorderSizePixel: 0,
			ZIndex: 2,
		} as WriteableStyle<Frame>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			Size: UDim2.fromScale(0, 0),
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextWrapped: true,
		} as WriteableStyle<TextLabel>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.secondary.main,
			Thickness: 2,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	}),
);

export default useSwitchStyles;
