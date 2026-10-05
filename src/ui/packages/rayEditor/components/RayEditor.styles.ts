import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useRayEditorStyles = componentStyles("RayEditor", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		column: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		row: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(1.5)),
			BackgroundTransparency: 1,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
	}),
);

export default useRayEditorStyles;
