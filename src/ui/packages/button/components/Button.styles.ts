import { controlMetrics, createStyles, componentStyles, Theme, WriteableStyle } from "theme";
import { ButtonProps } from "./Button";

const makeRootStyles = (theme: Theme, { size, color, fullWidth, variant }: ButtonProps) => {
	const metrics = controlMetrics(theme.density, size);
	const defaultStyles: WriteableStyle<TextButton> = {
		Size: new UDim2(0, metrics.buttonWidth, 0, metrics.buttonHeight),
	};

	if (fullWidth) {
		defaultStyles.Size = new UDim2(
			1,
			-theme.padding.calc(4),
			defaultStyles.Size?.Y.Scale ?? 0,
			defaultStyles.Size?.Y.Offset ?? 0,
		);

		defaultStyles.AnchorPoint = new Vector2(0.5, 0);
		defaultStyles.Position = new UDim2(
			0.5,
			defaultStyles.Position?.X.Offset ?? 0,
			defaultStyles.Position?.Y.Scale ?? 0,
			defaultStyles.Position?.Y.Offset ?? 0,
		);
	}

	const brand = color === "primary" ? theme.palette.primary : undefined;
	defaultStyles.BackgroundColor3 = brand ? brand.main : theme.palette.text.primary;
	defaultStyles.TextColor3 = brand ? brand.on : theme.palette.text.inverse;

	switch (variant) {
		case "contained":
			defaultStyles.BackgroundTransparency = 0;
			defaultStyles.BorderSizePixel = 0;
			break;
		case "outlined":
			defaultStyles.TextColor3 = brand ? brand.main : theme.palette.text.primary;
			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = theme.options.constants.borders.default;
			break;
		case "text":
			defaultStyles.TextColor3 = brand ? brand.main : theme.palette.text.primary;
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

const useButtonStyles = componentStyles<ButtonProps>("Button", 
	(theme, { size, color = "primary", fullWidth = false, variant = "contained" }) => {
		const metrics = controlMetrics(theme.density, size);
		return createStyles({
			root: makeRootStyles(theme, { size, color, fullWidth, variant }),
			font: {
				TextSize: metrics.font,
				Font: theme.typography.fontFamilies.default,
			} as WriteableStyle<TextLabel>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: color === "primary" ? theme.palette.primary.main : theme.palette.text.primary,
				Transparency: 0,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			} as WriteableStyle<UIStroke>,
		});
	},
);

export default useButtonStyles;
