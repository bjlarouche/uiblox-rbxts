import { createStyles, Theme, componentStyles, DEFAULT_THEME, WriteableStyle } from "theme";
import { Icons } from "ui/enums";
import ToastVariants from "../enums/ToastVariants";
import { ToastProps } from "./Toast";
import { toastPlace } from "./toastPlace";

const useToastStyles = componentStyles<ToastProps>("Toast", (theme: Theme, { variant = ToastVariants.default, action, edge }) => {
	const getToastColors = (): { background: Color3; content: Color3 } => {
		switch (variant) {
			case ToastVariants.success:
				return {
					background: theme.palette.status.success.main,
					content: theme.palette.status.success.on,
				};
			case ToastVariants.error:
				return {
					background: theme.palette.status.error.main,
					content: theme.palette.status.error.on,
				};
			case ToastVariants.warning:
				return {
					background: theme.palette.status.warning.main,
					content: theme.palette.status.warning.on,
				};
			default:
				return {
					background: theme.palette.surface.overlay,
					content: theme.palette.text.primary,
				};
		}
	};

	const toastColors = getToastColors();
	const hasAction = action !== undefined && action.size() > 0;
	const glyph = theme.typography.fontSizes.caption ?? 12;
	const actionSlot = (hasAction ? theme.spacing.calc(8) : 0) + glyph + theme.padding.calc(1);
	const place = toastPlace(edge, DEFAULT_THEME.padding.calc(2), DEFAULT_THEME.spacing.calc(20) + DEFAULT_THEME.padding.calc(2));
	const ACTIVE_POSITION = new UDim2(0.5, 0, place.activeY, place.activeOffset);
	const INACTIVE_POSITION = new UDim2(0.5, 0, place.idleY, place.idleOffset);

	return createStyles({
		container: {
			Size: new UDim2(0, theme.spacing.calc(20), 0, theme.spacing.calc(4)),
			Position: ACTIVE_POSITION,
			BackgroundColor3: toastColors.background,
			AnchorPoint: new Vector2(0.5, place.anchorY),
			BorderSizePixel: 0,
			ZIndex: 50000,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(1, -(theme.padding.calc(4) + actionSlot), 1, -theme.padding.calc(4)),
			Position: hasAction ? new UDim2(0, theme.padding.calc(2), 0.5, 0) : new UDim2(0.5, 0, 0.5, 0),
			AnchorPoint: hasAction ? new Vector2(0, 0.5) : new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: toastColors.content,
			Font: theme.typography.fontFamilies.default,
			TextXAlignment: hasAction ? Enum.TextXAlignment.Left : Enum.TextXAlignment.Center,
			TextWrapped: true,
			TextTruncate: Enum.TextTruncate.None,
			TextScaled: false,
			ZIndex: 50001,
		} as WriteableStyle<TextLabel>,
		action: {
			AutomaticSize: Enum.AutomaticSize.X,
			Size: new UDim2(0, 0, 0, theme.spacing.calc(3)),
			Position: new UDim2(
				1,
				-(theme.padding.calc(2) + glyph + theme.padding.calc(1)),
				0.5,
				0,
			),
			AnchorPoint: new Vector2(1, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: toastColors.content,
			AutoButtonColor: false,
			ZIndex: 50001,
		} as WriteableStyle<TextButton>,
		close: {
			Size: UDim2.fromOffset(glyph, glyph),
			Position: new UDim2(1, -theme.padding.calc(2), 0.5, 0),
			AnchorPoint: new Vector2(1, 0.5),
			ImageColor3: toastColors.content,
			Image: Icons.Close,
			ScaleType: Enum.ScaleType.Fit,
			BackgroundTransparency: 1,
			AutoButtonColor: false,
			BorderSizePixel: 0,
			Active: true,
			ZIndex: 50001,
		} as WriteableStyle<ImageButton>,
		activePosition: {
			Position: ACTIVE_POSITION,
		} as WriteableStyle<Frame>,
		inActivePosition: {
			Position: INACTIVE_POSITION,
		} as WriteableStyle<Frame>,
	});
});

export default useToastStyles;
