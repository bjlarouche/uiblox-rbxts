import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { editorPad, editorText } from "ui/packages/editorFace";

const useColorPickerStyles = componentStyles("ColorPicker", (theme: Theme) =>
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
			Padding: new UDim(0, editorPad(theme)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		rowLayout: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, editorPad(theme)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		swatch: {
			Size: UDim2.fromOffset(theme.spacing.calc(3), theme.spacing.calc(3)),
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
			Size: new UDim2(1, -theme.spacing.calc(4), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		plane: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(10)),
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		planeOverlay: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: new Color3(0, 0, 0),
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		cursor: {
			Size: UDim2.fromOffset(theme.spacing.calc(1.25), theme.spacing.calc(1.25)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		cursorStroke: {
			Color: new Color3(1, 1, 1),
			Thickness: 2,
		} as WriteableStyle<UIStroke>,
		hue: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(1.75)),
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		hueKnob: {
			Size: UDim2.fromOffset(theme.padding.calc(1.25), theme.spacing.calc(1.75)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundColor3: theme.palette.text.primary,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		sequenceBar: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BorderSizePixel: 0,
			Active: true,
		} as WriteableStyle<Frame>,
		stop: {
			Size: UDim2.fromOffset(theme.spacing.calc(1.5), theme.spacing.calc(1.5)),
			AnchorPoint: new Vector2(0.5, 0.5),
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		channel: {
			Size: new UDim2(1 / 3, -editorPad(theme), 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(0, theme.spacing.calc(1.5), 1, 0),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		channelField: {
			Size: new UDim2(1, -theme.spacing.calc(1.5), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		field: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		swatchButton: {
			Size: UDim2.fromOffset(theme.spacing.calc(3), theme.spacing.calc(3)),
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Text: "",
		} as WriteableStyle<TextButton>,
		value: {
			Size: new UDim2(1, -theme.spacing.calc(4), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		shell: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		shellPad: {
			PaddingTop: new UDim(0, editorPad(theme)),
			PaddingBottom: new UDim(0, editorPad(theme)),
			PaddingLeft: new UDim(0, editorPad(theme)),
			PaddingRight: new UDim(0, editorPad(theme)),
		} as WriteableStyle<UIPadding>,
		shellStroke: {
			Color: theme.palette.divider,
			Thickness: 1,
		} as WriteableStyle<UIStroke>,
		recent: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		recentChip: {
			Size: UDim2.fromOffset(theme.spacing.calc(2), theme.spacing.calc(2)),
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Text: "",
		} as WriteableStyle<TextButton>,
		link: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			AutoButtonColor: false,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextButton>,
	}),
);

export default useColorPickerStyles;
