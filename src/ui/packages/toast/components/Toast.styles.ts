import { createStyles, Theme, makeStyles, DefaultTheme } from "theme";
import { Icons } from "ui/enums";

export const ACTIVE_POSITION = new UDim2(0.5, 0, 1, -DefaultTheme.padding.calc(2));
export const INACTIVE_POSITION = new UDim2(0.5, 0, 1, DefaultTheme.spacing.calc(20) + DefaultTheme.padding.calc(2));

const useToastStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			Size: new UDim2(0, theme.spacing.calc(20), 0, theme.spacing.calc(4)),
			Position: INACTIVE_POSITION,
			AnchorPoint: new Vector2(0.5, 1),
			BorderSizePixel: 0,
			ZIndex: 50000,
		} as Partial<WritableInstanceProperties<Frame>>,
		label: {
			Size: new UDim2(1, -theme.padding.calc(4), 1, -theme.padding.calc(4)),
			Position: new UDim2(0.5, 0, 0.5, 0),
			AnchorPoint: new Vector2(0.5, 0.5),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.options.constants.extendedPalette.Common.White,
			Font: theme.typography.fontFamilies.default,
			TextScaled: false,
			ZIndex: 50001,
		} as Partial<WritableInstanceProperties<TextLabel>>,
		close: {
			Size: new UDim2(0, theme.spacing.calc(1), 0, theme.spacing.calc(1)),
			Position: new UDim2(1, -theme.padding.calc(2), 0, theme.padding.calc(2)),
			AnchorPoint: new Vector2(1, 0),
			ImageColor3: theme.options.constants.colors.iconDefault,
			Image: Icons.Close,
			BackgroundTransparency: 1,
			AutoButtonColor: false,
			BorderSizePixel: 0,
			Active: true,
			ZIndex: 50001,
		} as Partial<WritableInstanceProperties<ImageButton>>,
	}),
);

export default useToastStyles;
