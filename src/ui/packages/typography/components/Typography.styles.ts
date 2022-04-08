import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { COLOR_TO_PALETTE } from "../maps";
import { TypographyProps } from "./Typography";

const makeRootStyles = (theme: Theme, { color, align, noWrap, lineClamp }: TypographyProps) => {
	/**
	 * Default style override
	 */
	const defaultStyles: WriteableStyle<TextLabel> = {};

	if (color === "warning") {
		defaultStyles.TextColor3 = theme.options.constants.colors.caution;
	} else if (color) {
		defaultStyles.TextColor3 = COLOR_TO_PALETTE(color);
	}

	switch (align) {
		case "left":
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Left;
			break;
		case "center":
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Center;
			break;
		case "right":
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Right;
			break;
		default:
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Left;
			break;
	}

	defaultStyles.TextColor3 = color && COLOR_TO_PALETTE(color);
	// eslint-disable-next-line roblox-ts/lua-truthiness
	defaultStyles.TextWrapped = !noWrap;
	defaultStyles.ClipsDescendants = lineClamp;

	defaultStyles.BackgroundTransparency = 1;
	defaultStyles.BorderSizePixel = 0;
	defaultStyles.Size = new UDim2(1, 0, 1, 0);
	defaultStyles.ZIndex = 10000;

	return defaultStyles;
};

const useTypographyStyles = makeStyles<TypographyProps>(
	(
		theme,
		{ color = "initial", variant = "body", family = "default", align = "left", noWrap = false, lineClamp = false },
	) =>
		createStyles({
			root: makeRootStyles(theme, { color, align, noWrap, lineClamp }),
			variantToken: {
				// eslint-disable-next-line roblox-ts/lua-truthiness
				TextSize: variant && theme.typography.fontSizes[variant],
				Font: family && theme.typography.fontFamilies[family],
			} as WriteableStyle<TextLabel>,
		}),
);

export default useTypographyStyles;
