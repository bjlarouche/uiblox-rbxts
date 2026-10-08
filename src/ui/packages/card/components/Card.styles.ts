import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { cardColumnWidth } from "./cardWidth";

const useCardStyles = componentStyles<{ fullWidth?: boolean }>("Card", (theme: Theme, { fullWidth = false }) => {
	const width = cardColumnWidth(fullWidth, theme.padding.calc(32));
	return createStyles({
		column: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(width.scale, width.offset, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		title: {
			LayoutOrder: 1,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			TextWrapped: true,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.h6,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		subtitle: {
			LayoutOrder: 2,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			TextWrapped: true,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.secondary,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextLabel>,
		body: {
			LayoutOrder: 3,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		actions: {
			LayoutOrder: 4,
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		actionList: {
			FillDirection: Enum.FillDirection.Horizontal,
			HorizontalAlignment: Enum.HorizontalAlignment.Right,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
	});
});

export default useCardStyles;
