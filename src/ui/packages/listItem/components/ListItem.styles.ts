import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { listItemInk, ListItemTone } from "./listItemInk";
import { listItemLabelLayout, listItemSecondaryLayout, ListItemLabelLayout } from "./listItemLayout";

const useListItemStyles = componentStyles<{
	selected?: boolean;
	disabled?: boolean;
	dense?: boolean;
	wrap?: boolean;
	tone?: ListItemTone;
}>("ListItem", (theme: Theme, { selected = false, disabled = false, dense = false, wrap = false, tone }) => {
		const pad = theme.padding.calc(dense === true ? 0.5 : 1);
		const primaryLayout = listItemLabelLayout(wrap);
		const secondaryLayout = listItemSecondaryLayout();
		const ink = listItemInk(tone, disabled);
		const primaryColor =
			ink === "error"
				? theme.palette.status.error.main
				: ink === "disabled"
					? theme.palette.text.disabled
					: theme.palette.text.primary;
		const textBox = (label: ListItemLabelLayout) => ({
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(label.widthScale, 0, 0, 0),
			TextWrapped: label.wrapped,
			TextTruncate: label.truncate ? Enum.TextTruncate.AtEnd : Enum.TextTruncate.None,
		});
		return createStyles({
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
				PaddingTop: new UDim(0, pad),
				PaddingBottom: new UDim(0, pad),
				PaddingLeft: new UDim(0, pad),
				PaddingRight: new UDim(0, pad),
			} as WriteableStyle<UIPadding>,
			list: {
				FillDirection: Enum.FillDirection.Vertical,
				SortOrder: Enum.SortOrder.LayoutOrder,
			} as WriteableStyle<UIListLayout>,
			primary: {
				LayoutOrder: 1,
				...textBox(primaryLayout),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: dense === true ? theme.typography.fontSizes.caption : theme.typography.fontSizes.body,
				TextColor3: primaryColor,
				TextXAlignment: Enum.TextXAlignment.Left,
			} as WriteableStyle<TextLabel>,
			secondary: {
				LayoutOrder: 2,
				...textBox(secondaryLayout),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption,
				TextColor3: theme.palette.text.secondary,
				TextXAlignment: Enum.TextXAlignment.Left,
			} as WriteableStyle<TextLabel>,
			divider: {
				LayoutOrder: 3,
				Size: new UDim2(1, 0, 0, 1),
				BackgroundColor3: theme.palette.divider,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
		});
	},
);

export default useListItemStyles;
