import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useTooltipStyles = componentStyles("Tooltip", (theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		label: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3: theme.palette.surface.overlay,
			BorderSizePixel: 0,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			Interactable: false,
			ZIndex: 20002,
		} as WriteableStyle<TextLabel>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.default),
			PaddingBottom: new UDim(0, theme.padding.default),
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		shell: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.surface.overlay,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		stack: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.default),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		title: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.semibold,
			TextSize: theme.typography.fontSizes.caption,
			TextWrapped: true,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		body: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			TextColor3: theme.palette.text.primary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextWrapped: true,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
	}),
);

export default useTooltipStyles;
