import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { COLOR_TO_PALETTE } from "../maps";
import { TypographyProps } from "./Typography";

const makeRootStyles = (theme: Theme, { color, align, noWrap }: TypographyProps) => {
	/**
	 * Default style override
	 */
	const defaultStyles: WriteableStyle<TextLabel> = {};

	if (lineClamp !== undefined) {
		defaultStyles.ClipsDescendants = true;
	}

	if (color === "warning") {
		defaultStyles.TextColor3 = theme.options.constants.colors.caution;
	} else if (color) {
		defaultStyles.TextColor3 = COLOR_TO_PALETTE(color);
	}

	switch (align) {
		case "left":
			defaultStyles.TextXAlignment = Enum.TextXAlignment.Left;
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

	return defaultStyles;
};

const useTypographyStyles = makeStyles<TypographyProps>(
	(theme, { color = "initial", variant = "body", family = "default", align = "left", noWrap = false }) =>
		createStyles({
			// increase specificity to override
			root: makeRootStyles(theme, { color, align, noWrap }),
			// Typography 2.0 system
			variantToken: {
				// eslint-disable-next-line roblox-ts/lua-truthiness
				TextSize: variant && theme.typography.fontSizes[variant],
				Font: family && theme.typography.fontFamilies[family],
			} as WriteableStyle<TextLabel>,
		}),
);

export default useTypographyStyles;
