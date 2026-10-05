import { componentStyles, ControlSize, controlMetrics, createStyles, Theme, WriteableStyle } from "theme";

export type ChipColor = "default" | "primary";

const useChipStyles = componentStyles<{
	selected?: boolean;
	disabled?: boolean;
	deletable?: boolean;
	size?: ControlSize;
	variant?: "filled" | "outlined";
	color?: ChipColor;
}>("Chip", (theme: Theme, { selected = false, disabled = false, deletable = false, size, variant = "filled", color = "default" }) => {
	const metrics = controlMetrics(theme.density, size);
	const padY = size === "small" ? 0.25 : size === "large" ? 0.75 : 0.5;
	const padX = size === "small" ? 1 : size === "large" ? 2 : 1.5;
	const deletePx = metrics.icon;
	const primary = color === "primary";
	const ink = disabled
		? theme.palette.text.disabled
		: primary
			? variant === "outlined"
				? theme.palette.primary.main
				: theme.palette.primary.on
			: theme.palette.text.primary;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3:
				primary && variant !== "outlined"
					? theme.palette.primary.main
					: selected
						? theme.palette.action.selected
						: theme.palette.surface.input,
			BackgroundTransparency: variant === "outlined" && selected !== true ? 1 : 0,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Active: !disabled,
			Selectable: !disabled,
			TextColor3: ink,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
		} as WriteableStyle<TextButton>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(padY)),
			PaddingBottom: new UDim(0, theme.padding.calc(padY)),
			PaddingLeft: new UDim(0, theme.padding.calc(padX)),
			PaddingRight: new UDim(0, theme.padding.calc(deletable ? 0.5 : padX)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(theme.shape.pillScale, 0),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: primary ? theme.palette.primary.main : theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			Transparency: variant === "outlined" ? (disabled ? 0.5 : 0) : primary || selected ? 1 : 0,
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
			TextColor3: ink,
			Font: theme.typography.fontFamilies.default,
			TextSize: metrics.font,
			LayoutOrder: 1,
		} as WriteableStyle<TextLabel>,
		delete: {
			Size: UDim2.fromOffset(deletePx, deletePx),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			ImageColor3: disabled ? theme.palette.text.disabled : primary && variant !== "outlined" ? theme.palette.primary.on : theme.palette.text.secondary,
			LayoutOrder: 2,
		} as WriteableStyle<ImageButton>,
	});
});

export default useChipStyles;
