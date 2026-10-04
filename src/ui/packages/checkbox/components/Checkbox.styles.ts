import { createStyles, makeStyles, WriteableStyle } from "theme";

const useCheckboxStyles = makeStyles((theme) =>
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
		box: {
			Size: UDim2.fromOffset(theme.spacing.calc(2), theme.spacing.calc(2)),
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		mark: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.background.default,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.button,
		} as WriteableStyle<TextLabel>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			BackgroundTransparency: 1,
			Size: UDim2.fromScale(0, 0),
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
		} as WriteableStyle<TextLabel>,
		stroke: {
			Color: theme.palette.text.primary,
			Thickness: 1,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	}),
);

export default useCheckboxStyles;
