import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useMarkdownStyles = componentStyles("Markdown", (theme: Theme) => {
	const gap = theme.density === "compact" ? theme.padding.calc(1) : theme.spacing.calc(1);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		layout: {
			FillDirection: Enum.FillDirection.Vertical,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			VerticalAlignment: Enum.VerticalAlignment.Top,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, gap),
		} as WriteableStyle<UIListLayout>,
		block: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		text: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Top,
			TextWrapped: true,
			RichText: true,
		} as WriteableStyle<TextLabel>,
		code: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		codePad: {
			PaddingTop: new UDim(0, theme.padding.calc(1)),
			PaddingBottom: new UDim(0, theme.padding.calc(1)),
			PaddingLeft: new UDim(0, theme.padding.calc(1.5)),
			PaddingRight: new UDim(0, theme.padding.calc(1.5)),
		} as WriteableStyle<UIPadding>,
		codeText: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: Enum.Font.RobotoMono,
			TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextYAlignment: Enum.TextYAlignment.Top,
			TextWrapped: true,
		} as WriteableStyle<TextLabel>,
		quote: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		quoteBar: {
			Size: new UDim2(0, 3, 1, 0),
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		quotePad: {
			PaddingTop: new UDim(0, theme.padding.calc(1)),
			PaddingBottom: new UDim(0, theme.padding.calc(1)),
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIPadding>,
		listItem: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
	});
});

export default useMarkdownStyles;
