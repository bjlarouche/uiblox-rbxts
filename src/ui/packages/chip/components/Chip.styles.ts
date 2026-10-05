import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useChipStyles = componentStyles<{ selected?: boolean; disabled?: boolean }>(
	"Chip",
	(theme: Theme, { selected = false, disabled = false }) =>
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
				PaddingRight: new UDim(0, theme.padding.calc(1.5)),
			} as WriteableStyle<UIPadding>,
			corner: {
				CornerRadius: new UDim(theme.shape.pillScale, 0),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: theme.palette.border,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
				Transparency: selected ? 1 : 0,
			} as WriteableStyle<UIStroke>,
		}),
);

export default useChipStyles;
