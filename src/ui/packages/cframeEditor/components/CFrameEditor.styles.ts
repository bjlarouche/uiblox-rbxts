import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { editorPad, editorText } from "ui/packages/editorFace";

const useCFrameEditorStyles = componentStyles("CFrameEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		wrap: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, editorPad(theme)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, editorPad(theme)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		group: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		groupLabel: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		axes: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		axis: {
			Size: new UDim2(1 / 3, -editorPad(theme), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(0, theme.spacing.calc(2.5), 1, 0),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		labelX: {
			TextColor3: theme.palette.status.error.main,
		} as WriteableStyle<TextLabel>,
		labelY: {
			TextColor3: theme.palette.status.success.main,
		} as WriteableStyle<TextLabel>,
		labelZ: {
			TextColor3: theme.palette.status.info.main,
		} as WriteableStyle<TextLabel>,
		field: {
			Size: new UDim2(1, -theme.spacing.calc(2.5), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useCFrameEditorStyles;
