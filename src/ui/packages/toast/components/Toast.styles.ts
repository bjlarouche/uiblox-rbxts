import { createStyles, Theme, componentStyles, controlMetrics, WriteableStyle } from "theme";
import ToastVariants from "../enums/ToastVariants";
import { ToastProps } from "./Toast";
import { toastGlyph, toastPlace } from "./toastPlace";

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
			case ToastVariants.info:
				return {
					background: theme.palette.status.info.main,
					content: theme.palette.status.info.on,
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
	const glyph = controlMetrics(theme.density).icon;
	const hit = glyph + theme.padding.calc(2);
	const marked = toastGlyph(variant) !== undefined;
	const lead = marked ? glyph + theme.padding.calc(1) : 0;
	const pinLeft = hasAction || marked;
	const actionSlot = (hasAction ? theme.spacing.calc(8) : 0) + hit;
	const place = toastPlace(edge, theme.padding.calc(2), theme.spacing.calc(20) + theme.padding.calc(2));
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
			Size: new UDim2(1, -(theme.padding.calc(4) + actionSlot + lead), 1, -theme.padding.calc(4)),
			Position: pinLeft ? new UDim2(0, theme.padding.calc(2) + lead, 0.5, 0) : new UDim2(0.5, 0, 0.5, 0),
			AnchorPoint: pinLeft ? new Vector2(0, 0.5) : new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: toastColors.content,
			Font: theme.typography.fontFamilies.default,
			TextXAlignment: pinLeft ? Enum.TextXAlignment.Left : Enum.TextXAlignment.Center,
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
				-(theme.padding.calc(1) + hit),
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
			Size: UDim2.fromOffset(hit, hit),
			Position: new UDim2(1, -theme.padding.calc(1), 0.5, 0),
			AnchorPoint: new Vector2(1, 0.5),
			ZIndex: 50001,
		} as WriteableStyle<ImageButton>,
		mark: {
			Position: new UDim2(0, theme.padding.calc(2), 0.5, 0),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundTransparency: 1,
			ZIndex: 50001,
		} as WriteableStyle<ImageLabel>,
		closeGlyph: {
			Size: UDim2.fromOffset(glyph, glyph),
			ImageColor3: toastColors.content,
		} as WriteableStyle<ImageLabel>,
		activePosition: {
			Position: ACTIVE_POSITION,
		} as WriteableStyle<Frame>,
		inActivePosition: {
			Position: INACTIVE_POSITION,
		} as WriteableStyle<Frame>,
	});
});

export default useToastStyles;
