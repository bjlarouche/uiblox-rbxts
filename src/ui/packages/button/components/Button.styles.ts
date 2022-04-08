import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { COLOR_TO_PALETTE } from "../../typography/maps";
import { ButtonProps } from "./Button";

const makeRootStyles = (theme: Theme, { size, color, fullWidth, variant }: ButtonProps) => {
	/**
	 * Default style override
	 */
	const defaultStyles: WriteableStyle<TextButton> = {};

	switch (size) {
		case "small":
			defaultStyles.Size = new UDim2(0, theme.spacing.calc(8), 0, theme.spacing.calc(2));
			break;
		case "medium":
			defaultStyles.Size = new UDim2(0, theme.spacing.calc(12), 0, theme.spacing.calc(3));
			break;
		case "large":
			defaultStyles.Size = new UDim2(0, theme.spacing.calc(16), 0, theme.spacing.calc(4));
			break;
		default:
			defaultStyles.Size = new UDim2(0, theme.spacing.calc(8), 0, theme.spacing.calc(2));
			break;
	}

	if (fullWidth) {
		// Make full width minus padding
		defaultStyles.Size = new UDim2(
			1,
			-theme.padding.calc(4),
			defaultStyles.Size?.Y.Scale ?? 0,
			defaultStyles.Size?.Y.Offset ?? 0,
		);

		// And center it horizontally
		defaultStyles.AnchorPoint = new Vector2(0.5, 0);
		defaultStyles.Position = new UDim2(
			0.5,
			defaultStyles.Position?.X.Offset ?? 0,
			defaultStyles.Position?.Y.Scale ?? 0,
			defaultStyles.Position?.Y.Offset ?? 0,
		);
	}

	defaultStyles.BackgroundColor3 = color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary;

	defaultStyles.TextColor3 = theme.palette.background.default;

	switch (variant) {
		case "contained":
			defaultStyles.BackgroundTransparency = 0;
			defaultStyles.BorderSizePixel = 0;
			break;
		case "outlined":
			defaultStyles.TextColor3 = color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary;
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = theme.options.constants.borders.default;
			break;
		case "text":
			defaultStyles.TextColor3 = color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary;
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;
			break;
		default:
			defaultStyles.BackgroundTransparency = 0;
			defaultStyles.BorderSizePixel = 0;
			break;
	}

	defaultStyles.ZIndex = 10000;

	return defaultStyles;
};

const useButtonStyles = makeStyles<ButtonProps>(
	(theme, { size = "small", color = "primary", fullWidth = false, variant = "contained" }) =>
		createStyles({
			root: makeRootStyles(theme, { size, color, fullWidth, variant }),
			font: {
				TextSize: theme.typography.fontSizes.button,
				Font: theme.typography.fontFamilies.default,
			} as WriteableStyle<TextLabel>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: color === "primary" ? theme.palette.secondary.main : theme.palette.text.primary,
				Transparency: 0,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			} as WriteableStyle<UIStroke>,
		}),
);

export default useButtonStyles;
