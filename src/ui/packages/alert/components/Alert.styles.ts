import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { AlertSeverity, alertSeverity } from "./alertTone";

const useAlertStyles = componentStyles<{ severity?: AlertSeverity; dismissible?: boolean; filled?: boolean }>(
	"Alert",
	(theme: Theme, { severity, dismissible, filled }) => {
	const tone = theme.palette.status[alertSeverity(severity)];
	const closeSize = theme.spacing.calc(2);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: filled === true ? tone.main : tone.surface,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(1.5)),
			PaddingBottom: new UDim(0, theme.padding.calc(1.5)),
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
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
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, dismissible === true ? -(closeSize + theme.padding.calc(1)) : 0, 0, 0),
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
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: filled === true ? tone.on : tone.main,
			TextXAlignment: Enum.TextXAlignment.Left,
			LayoutOrder: 1,
		} as WriteableStyle<TextLabel>,
		message: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body,
			TextColor3: filled === true ? tone.on : theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextWrapped: true,
			LayoutOrder: 2,
		} as WriteableStyle<TextLabel>,
		close: {
			Size: UDim2.fromOffset(closeSize, closeSize),
			Position: new UDim2(1, 0, 0, 0),
			AnchorPoint: new Vector2(1, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ImageColor3: filled === true ? tone.on : theme.palette.text.secondary,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 2,
		} as WriteableStyle<ImageButton>,
	});
});

export default useAlertStyles;
