import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";
import { COLOR_TO_PALETTE } from "../maps";
import { TypographyProps } from "./Typography";

const makeRootStyles = (theme: Theme, { lineClamp, color }: TypographyProps) => {
	/**
	 * Default style override
	 */
	const defaultStyles: WriteableStyle<TextLabel> = {};

	if (lineClamp !== undefined) {
		// defaultStyles.maxWidth = '100%';
		// defaultStyles.overflow = 'hidden';
		defaultStyles.ClipsDescendants = true;
		// defaultStyles.textOverflow = 'ellipsis';

		/* Clamp at n lines */
		// defaultStyles.display = 'box';
		// defaultStyles.lineClamp = lineClamp;
		// defaultStyles.boxOrient = 'vertical';
	}

	if (color === "warning") {
		defaultStyles.TextColor3 = theme.options.constants.colors.caution;
	} else if (color) {
		defaultStyles.TextColor3 = COLOR_TO_PALETTE(color);
	}

	return defaultStyles;
};

const useTypographyStyles = makeStyles<TypographyProps>((theme, { lineClamp, color, variant, family }) =>
	createStyles({
		// increase specificity to override
		root: makeRootStyles(theme, { lineClamp, color }),
		// Typography 2.0 system
		variantToken: {
			// eslint-disable-next-line roblox-ts/lua-truthiness
			TextSize: variant && theme.typography.fontSizes[variant],
			Font: family && theme.typography.fontFamilies[family],
		} as WriteableStyle<TextLabel>,
	}),
);

export default useTypographyStyles;
