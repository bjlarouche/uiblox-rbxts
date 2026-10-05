import { createStyles, Theme, componentStyles, DEFAULT_THEME, WriteableStyle } from "theme";
import { Icons } from "ui/enums";
import ToastVariants from "../enums/ToastVariants";
import { ToastProps } from "./Toast";

const useToastStyles = componentStyles<ToastProps>("Toast", (theme: Theme, { variant = ToastVariants.default }) => {
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
	const ACTIVE_POSITION = new UDim2(0.5, 0, 1, -DEFAULT_THEME.padding.calc(2));
	const INACTIVE_POSITION = new UDim2(0.5, 0, 1, DEFAULT_THEME.spacing.calc(20) + DEFAULT_THEME.padding.calc(2));

	return createStyles({
		container: {
			Size: new UDim2(0, theme.spacing.calc(20), 0, theme.spacing.calc(4)),
			Position: INACTIVE_POSITION,
			BackgroundColor3: toastColors.background,
			AnchorPoint: new Vector2(0.5, 1),
			BorderSizePixel: 0,
			ZIndex: 50000,
		} as WriteableStyle<Frame>,
		label: {
			Size: new UDim2(1, -theme.padding.calc(4), 1, -theme.padding.calc(4)),
			Position: new UDim2(0.5, 0, 0.5, 0),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: toastColors.content,
			Font: theme.typography.fontFamilies.default,
			TextScaled: false,
			ZIndex: 50001,
		} as WriteableStyle<TextLabel>,
		close: {
			Size: new UDim2(0, theme.spacing.calc(1), 0, theme.spacing.calc(1)),
			Position: new UDim2(1, -theme.padding.calc(2), 0, theme.padding.calc(2)),
			AnchorPoint: new Vector2(1, 0),
			ImageColor3: toastColors.content,
			Image: Icons.Close,
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
