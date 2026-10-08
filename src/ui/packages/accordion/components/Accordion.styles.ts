import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useAccordionStyles = componentStyles<{ open?: boolean; disabled?: boolean }>("Accordion", (theme: Theme, { open = false, disabled }) =>
	createStyles({
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
		title: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, -theme.spacing.calc(4), 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextTransparency: disabled === true ? 0.5 : 0,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		copy: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, -theme.spacing.calc(4), 0, 0),
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
			TextColor3: theme.palette.text.secondary,
			TextTransparency: disabled === true ? 0.5 : 0,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		icon: {
			Size: UDim2.fromOffset(theme.options.constants.iconSizes.small, theme.options.constants.iconSizes.small),
			Position: new UDim2(1, -theme.padding.calc(1.5), 0.5, 0),
			AnchorPoint: new Vector2(1, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ImageColor3: theme.palette.text.primary,
			ImageTransparency: disabled === true ? 0.5 : 0,
		} as WriteableStyle<ImageLabel>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(1)),
			PaddingBottom: new UDim(0, theme.padding.calc(1)),
			PaddingLeft: new UDim(0, theme.padding.calc(1.5)),
			PaddingRight: new UDim(0, theme.padding.calc(1.5)),
		} as WriteableStyle<UIPadding>,
		body: {
			LayoutOrder: 2,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Visible: open,
		} as WriteableStyle<Frame>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	}),
);

export default useAccordionStyles;
