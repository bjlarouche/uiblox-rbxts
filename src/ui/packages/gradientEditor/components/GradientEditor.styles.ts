import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { editorPad, editorText } from "ui/packages/editorFace";

const useGradientEditorStyles = componentStyles("GradientEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		column: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, editorPad(theme)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		block: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		metrics: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		metricsRow: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, editorPad(theme)),
			VerticalAlignment: Enum.VerticalAlignment.Top,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		metric: {
			Size: new UDim2(0.5, -editorPad(theme) / 2, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		metricInner: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, editorPad(theme)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		metricLabel: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.secondary,
			...editorText(theme),
		} as WriteableStyle<TextLabel>,
		metricField: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(3)),
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
	}),
);

export default useGradientEditorStyles;
