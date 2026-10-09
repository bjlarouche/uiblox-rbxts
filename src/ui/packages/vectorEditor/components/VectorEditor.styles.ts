import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { editorPad, editorText } from "ui/packages/editorFace";

const useVectorEditorStyles = componentStyles("VectorEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		row: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, editorPad(theme)),
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		axis: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(0, theme.spacing.calc(1.5), 1, 0),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		field: {
			Size: new UDim2(1, -theme.spacing.calc(1.5), 1, 0),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useVectorEditorStyles;
