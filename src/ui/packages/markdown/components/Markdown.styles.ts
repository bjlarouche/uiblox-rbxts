import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useMarkdownStyles = componentStyles("Markdown", (theme: Theme) => {
	const gap = theme.density === "compact" ? theme.padding.calc(1) : theme.spacing.calc(1);
	const pad = theme.padding.calc(2);
	const span = new UDim2(1, -pad * 2, 0, 0);
	const cellWidth = theme.spacing.calc(14);
	return createStyles({
		inset: {
			PaddingTop: new UDim(0, pad),
			PaddingBottom: new UDim(0, pad),
			PaddingLeft: new UDim(0, pad),
			PaddingRight: new UDim(0, pad),
		} as WriteableStyle<UIPadding>,
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
			Size: span,
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
		quote: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: span,
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		quoteCorner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		quoteFaceCorner: {
			CornerRadius: new UDim(0, theme.shape.radius.small),
		} as WriteableStyle<UICorner>,
		quoteBarPad: {
			PaddingLeft: new UDim(0, 3),
		} as WriteableStyle<UIPadding>,
		quoteFace: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		quotePad: {
			PaddingTop: new UDim(0, theme.padding.calc(1)),
			PaddingBottom: new UDim(0, theme.padding.calc(1)),
			PaddingLeft: new UDim(0, theme.padding.calc(1)),
			PaddingRight: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIPadding>,
		quoteStack: {
			FillDirection: Enum.FillDirection.Vertical,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIListLayout>,
		tableScroll: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: span,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		tableGrid: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		tableRow: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		tableHead: {
			BackgroundColor3: theme.palette.surface.elevated,
			BackgroundTransparency: 0,
		} as WriteableStyle<Frame>,
		tableStroke: {
			Color: theme.palette.divider,
			Thickness: 1,
			Transparency: 0,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		tableCell: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(0, cellWidth, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextYAlignment: Enum.TextYAlignment.Top,
			TextWrapped: true,
			RichText: true,
		} as WriteableStyle<TextLabel>,
		tableHeadText: {
			Font: theme.typography.fontFamilies.bold,
			TextColor3: theme.palette.text.primary,
		} as WriteableStyle<TextLabel>,
		tableCellPad: {
			PaddingTop: new UDim(0, theme.padding.calc(1)),
			PaddingBottom: new UDim(0, theme.padding.calc(1)),
			PaddingLeft: new UDim(0, theme.padding.calc(1)),
			PaddingRight: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIPadding>,
		listItem: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		flow: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		quoteFlow: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		flowLayout: {
			FillDirection: Enum.FillDirection.Horizontal,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Wraps: true,
			Padding: new UDim(0, 4),
		} as WriteableStyle<UIListLayout>,
		word: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			RichText: true,
		} as WriteableStyle<TextLabel>,
	});
});

export default useMarkdownStyles;
