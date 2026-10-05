import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { AlertSeverity, alertSeverity } from "./alertTone";

const useAlertStyles = componentStyles<{ severity?: AlertSeverity }>("Alert", (theme: Theme, { severity }) => {
	const tone = theme.palette.status[alertSeverity(severity)];
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.Y,
			Size: new UDim2(1, 0, 0, 0),
			BackgroundColor3: tone.surface,
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
			Color: tone.border,
			Thickness: 1,
			Transparency: 0,
			ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
		} as WriteableStyle<UIStroke>,
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
			TextColor3: tone.main,
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
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			TextWrapped: true,
			LayoutOrder: 2,
		} as WriteableStyle<TextLabel>,
		close: {
			Size: UDim2.fromOffset(theme.spacing.calc(2), theme.spacing.calc(2)),
			Position: new UDim2(1, -theme.padding.calc(1), 0, theme.padding.calc(1)),
			AnchorPoint: new Vector2(1, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ImageColor3: theme.palette.text.secondary,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 2,
		} as WriteableStyle<ImageButton>,
	});
});

export default useAlertStyles;
