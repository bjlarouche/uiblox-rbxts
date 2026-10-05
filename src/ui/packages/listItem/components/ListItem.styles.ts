import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useListItemStyles = componentStyles<{ selected?: boolean; disabled?: boolean }>("ListItem", 
	(theme: Theme, { selected = false, disabled = false }) =>
		createStyles({
			root: {
				Size: new UDim2(1, 0, 0, 0),
				AutomaticSize: Enum.AutomaticSize.Y,
				BackgroundColor3: theme.palette.action.selected,
				BackgroundTransparency: selected ? 0 : 1,
				BorderSizePixel: 0,
				Text: "",
				AutoButtonColor: false,
				Active: !disabled,
				Selectable: !disabled,
			} as WriteableStyle<TextButton>,
			padding: {
				PaddingTop: new UDim(0, theme.padding.calc(1)),
				PaddingBottom: new UDim(0, theme.padding.calc(1)),
				PaddingLeft: new UDim(0, theme.padding.calc(1)),
				PaddingRight: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIPadding>,
			list: {
				FillDirection: Enum.FillDirection.Vertical,
				SortOrder: Enum.SortOrder.LayoutOrder,
			} as WriteableStyle<UIListLayout>,
			primary: {
				LayoutOrder: 1,
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.body,
				TextColor3: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
				TextXAlignment: Enum.TextXAlignment.Left,
			} as WriteableStyle<TextLabel>,
			secondary: {
				LayoutOrder: 2,
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption,
				TextColor3: theme.palette.text.secondary,
				TextXAlignment: Enum.TextXAlignment.Left,
			} as WriteableStyle<TextLabel>,
		}),
);

export default useListItemStyles;
