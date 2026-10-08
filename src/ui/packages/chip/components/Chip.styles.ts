import { componentStyles, ControlSize, controlMetrics, createStyles, Theme, WriteableStyle } from "theme";
import { ChipColor, chipTone } from "./chipTone";

export type { ChipColor };

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
	const tone = chipTone(color);
	const status =
		tone === "success"
			? theme.palette.status.success
			: tone === "error"
				? theme.palette.status.error
				: tone === "primary"
					? theme.palette.primary
					: undefined;
	const filledTone = status !== undefined && variant !== "outlined";
	const ink = disabled
		? theme.palette.text.disabled
		: status === undefined
			? theme.palette.text.primary
			: variant === "outlined"
				? status.main
				: status.on;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3:
				filledTone && status !== undefined
					? status.main
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
			Color: status !== undefined ? status.main : theme.palette.border,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			Transparency: variant === "outlined" ? (disabled ? 0.5 : 0) : tone !== "default" || selected ? 1 : 0,
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
			ImageColor3: disabled
				? theme.palette.text.disabled
				: filledTone && status !== undefined
					? status.on
					: theme.palette.text.secondary,
			LayoutOrder: 2,
		} as WriteableStyle<ImageButton>,
	});
});

export default useChipStyles;
