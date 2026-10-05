import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useChipStyles = componentStyles<{ selected?: boolean; disabled?: boolean; deletable?: boolean }>(
	"Chip",
	(theme: Theme, { selected = false, disabled = false, deletable = false }) =>
		createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundColor3: selected ? theme.palette.action.selected : theme.palette.surface.input,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				Active: !disabled,
				Selectable: !disabled,
				TextColor3: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.body,
			} as WriteableStyle<TextButton>,
			padding: {
				PaddingTop: new UDim(0, theme.padding.calc(0.5)),
				PaddingBottom: new UDim(0, theme.padding.calc(0.5)),
				PaddingLeft: new UDim(0, theme.padding.calc(1.5)),
				PaddingRight: new UDim(0, theme.padding.calc(deletable ? 0.5 : 1.5)),
			} as WriteableStyle<UIPadding>,
			corner: {
				CornerRadius: new UDim(theme.shape.pillScale, 0),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: theme.palette.border,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
				Transparency: selected ? 1 : 0,
			} as WriteableStyle<UIStroke>,
			row: {
				FillDirection: Enum.FillDirection.Horizontal,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(0.5)),
			} as WriteableStyle<UIListLayout>,
			label: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				TextColor3: disabled ? theme.palette.text.disabled : theme.palette.text.primary,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.body,
				LayoutOrder: 1,
			} as WriteableStyle<TextLabel>,
			delete: {
				Size: UDim2.fromOffset(theme.spacing.calc(2), theme.spacing.calc(2)),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				ImageColor3: disabled ? theme.palette.text.disabled : theme.palette.text.secondary,
				LayoutOrder: 2,
			} as WriteableStyle<ImageButton>,
		}),
);

export default useChipStyles;
