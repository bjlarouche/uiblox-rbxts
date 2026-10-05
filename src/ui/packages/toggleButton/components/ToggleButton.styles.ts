import { ControlSize, componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useToggleButtonStyles = componentStyles<{ selected?: boolean; disabled?: boolean; size?: ControlSize }>(
	"ToggleButton",
	(theme: Theme, { selected = false, disabled = false, size = "medium" }) => {
		const height = size === "small" ? theme.spacing.calc(3) : size === "large" ? theme.spacing.calc(5) : theme.spacing.calc(4);
		const textSize =
			size === "small"
				? theme.typography.fontSizes.caption
				: size === "large"
					? theme.typography.fontSizes.h6
					: theme.typography.fontSizes.body;
		const pad = theme.padding.calc(size === "small" ? 1 : 1.5);
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.X,
				Size: new UDim2(0, 0, 0, height),
				BackgroundColor3: selected ? theme.palette.action.selected : theme.palette.surface.input,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				Active: !disabled,
				Selectable: !disabled,
				TextColor3: disabled
					? theme.palette.text.disabled
					: selected
						? theme.palette.primary.main
						: theme.palette.text.primary,
				Font: theme.typography.fontFamilies.default,
				TextSize: textSize,
			} as WriteableStyle<TextButton>,
			padding: {
				PaddingLeft: new UDim(0, pad),
				PaddingRight: new UDim(0, pad),
			} as WriteableStyle<UIPadding>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: selected ? theme.palette.primary.main : theme.palette.border,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
				Transparency: disabled ? 0.5 : 0,
			} as WriteableStyle<UIStroke>,
			group: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(0.5)),
			} as WriteableStyle<UIListLayout>,
		});
	},
);

export default useToggleButtonStyles;
