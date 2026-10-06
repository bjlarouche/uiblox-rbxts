import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { listItemLabelLayout } from "./listItemLayout";

const useListItemStyles = componentStyles<{ selected?: boolean; disabled?: boolean; dense?: boolean; wrap?: boolean }>(
	"ListItem",
	(theme: Theme, { selected = false, disabled = false, dense = false, wrap = false }) => {
		const pad = theme.padding.calc(dense === true ? 0.5 : 1);
		const label = listItemLabelLayout(wrap);
		const textBox = {
			AutomaticSize: label.wrapped ? Enum.AutomaticSize.Y : Enum.AutomaticSize.XY,
			Size: new UDim2(label.widthScale, 0, 0, 0),
			TextWrapped: label.wrapped,
		};
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
				...textBox,
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: dense === true ? theme.typography.fontSizes.caption : theme.typography.fontSizes.body,
				TextColor3: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
				TextXAlignment: Enum.TextXAlignment.Left,
			} as WriteableStyle<TextLabel>,
			secondary: {
				LayoutOrder: 2,
				...textBox,
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
