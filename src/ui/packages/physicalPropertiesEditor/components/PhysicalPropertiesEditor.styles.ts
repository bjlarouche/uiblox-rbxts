import { controlMetrics, createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { editorPad, editorText } from "ui/packages/editorFace";

const usePhysicalPropertiesEditorStyles = componentStyles("PhysicalPropertiesEditor", (theme: Theme) => {
	const gap = editorPad(theme);
	return createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		wrap: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, gap),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		pair: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, gap),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		cell: {
			Size: new UDim2(0.5, -gap / 2, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		stack: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, gap),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		label: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		field: {
			Size: new UDim2(1, 0, 0, controlMetrics(theme.density).height),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	});
});

export default usePhysicalPropertiesEditorStyles;
