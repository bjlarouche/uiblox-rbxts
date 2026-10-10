import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useAccordionStyles = componentStyles<{ open?: boolean; disabled?: boolean }>("Accordion", (theme: Theme, { disabled }) => {
	const heading = theme.typography.variants.h6;
	const padX = theme.padding.calc(1.5);
	const padY = theme.padding.calc(1);
	const icon = theme.options.constants.iconSizes.small;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		header: {
			LayoutOrder: 1,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Text: "",
			Active: disabled !== true,
			Selectable: disabled !== true,
		} as WriteableStyle<TextButton>,
		hover: {
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: 0,
		} as WriteableStyle<TextButton>,
		tail: {
			PaddingBottom: new UDim(0, padY),
		} as WriteableStyle<UIPadding>,
		band: {
			Position: new UDim2(0, padX, 0, padY),
			Size: new UDim2(1, -(padX * 2), 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		title: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Position: new UDim2(0, padX, 0, padY),
			Size: new UDim2(1, -(padX * 2 + icon), 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies[heading.family],
			TextSize: heading.size,
			LineHeight: heading.leading,
			TextWrapped: true,
			TextColor3: theme.palette.text.primary,
			TextTransparency: disabled === true ? 0.5 : 0,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		copy: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Position: new UDim2(0, padX, 0, padY),
			Size: new UDim2(1, -(padX * 2 + icon), 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		note: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
			TextWrapped: true,
			TextColor3: theme.palette.text.secondary,
			TextTransparency: disabled === true ? 0.5 : 0,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		icon: {
			Size: UDim2.fromOffset(icon, icon),
			Position: new UDim2(1, -padX, 0.5, 0),
			AnchorPoint: new Vector2(1, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ImageColor3: theme.palette.text.primary,
			ImageTransparency: disabled === true ? 0.5 : 0,
		} as WriteableStyle<ImageLabel>,
		body: {
			LayoutOrder: 2,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: theme.palette.border,
			Thickness: 1,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
	});
});

export default useAccordionStyles;
