import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useColorPickerStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundColor3: theme.palette.primary.main,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Selectable: true,
		} as WriteableStyle<Frame>,
		column: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		rowLayout: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(1)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		swatch: {
			Size: UDim2.fromOffset(theme.spacing.calc(2), theme.spacing.calc(2)),
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		swatchStroke: {
			Color: theme.palette.divider,
			Thickness: 1,
		} as WriteableStyle<UIStroke>,
		corner: {
			CornerRadius: new UDim(0, theme.padding.calc(0.5)),
		} as WriteableStyle<UICorner>,
		hex: {
			Size: new UDim2(1, -theme.spacing.calc(3), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		plane: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(8)),
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		planeOverlay: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: new Color3(0, 0, 0),
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		cursor: {
			Size: UDim2.fromOffset(theme.spacing.calc(1), theme.spacing.calc(1)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		cursorStroke: {
			Color: new Color3(1, 1, 1),
			Thickness: 2,
		} as WriteableStyle<UIStroke>,
		hue: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(1.5)),
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		hueKnob: {
			Size: UDim2.fromOffset(theme.padding.calc(1), theme.spacing.calc(1.5)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundColor3: theme.palette.text.primary,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		channel: {
			Size: new UDim2(1 / 3, -theme.padding.calc(1), 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(0, theme.spacing.calc(1), 1, 0),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		channelField: {
			Size: new UDim2(1, -theme.spacing.calc(1), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useColorPickerStyles;
