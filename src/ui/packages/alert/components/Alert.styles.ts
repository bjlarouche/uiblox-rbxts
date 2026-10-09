import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { AlertSeverity, alertSeverity } from "./alertTone";

const useAlertStyles = componentStyles<{ severity?: AlertSeverity; dismissible?: boolean; filled?: boolean }>(
	"Alert",
	(theme: Theme, { severity, dismissible, filled }) => {
	const tone = theme.palette.status[alertSeverity(severity)];
	const padX = theme.padding.calc(2);
	const padY = theme.padding.calc(1.5);
	const glyph = theme.typography.fontSizes.body ?? theme.typography.variants.body.size;
	const hit = math.max(theme.spacing.calc(3), glyph + theme.padding.calc(2));
	const closeGap = dismissible === true ? hit + theme.padding.calc(1) : 0;
	const ink = filled === true ? tone.on : theme.palette.text.primary;
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: filled === true ? tone.main : tone.surface,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		padding: {
			PaddingBottom: new UDim(0, padY),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
		stroke: {
			Color: filled === true ? tone.main : tone.border,
			Thickness: 1,
			Transparency: filled === true ? 1 : 0,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
		body: {
			Position: new UDim2(0, padX, 0, padY),
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, -(padX * 2 + closeGap), 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		layout: {
			FillDirection: Enum.FillDirection.Vertical,
			HorizontalAlignment: Enum.HorizontalAlignment.Left,
			VerticalAlignment: Enum.VerticalAlignment.Center,
			SortOrder: Enum.SortOrder.LayoutOrder,
			Padding: new UDim(0, theme.padding.calc(0.5)),
		} as WriteableStyle<UIListLayout>,
		title: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: ink,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextWrapped: true,
			LayoutOrder: 1,
		} as WriteableStyle<TextLabel>,
		message: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
			TextColor3: ink,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextWrapped: true,
			LayoutOrder: 2,
		} as WriteableStyle<TextLabel>,
		action: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			TextWrapped: true,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: ink,
			AutoButtonColor: false,
			LayoutOrder: 3,
		} as WriteableStyle<TextButton>,
		close: {
			Size: UDim2.fromOffset(hit, hit),
			Position: new UDim2(1, -padX, 0, padY + glyph / 2),
			AnchorPoint: new Vector2(1, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			ImageTransparency: 1,
			ZIndex: 2,
		} as WriteableStyle<ImageButton>,
		closeGlyph: {
			Size: UDim2.fromOffset(glyph, glyph),
			Position: UDim2.fromScale(0.5, 0.5),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ImageColor3: ink,
			ScaleType: Enum.ScaleType.Fit,
		} as WriteableStyle<ImageLabel>,
	});
});

export default useAlertStyles;
