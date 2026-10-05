import { createStyles, makeStyles, WriteableStyle } from "theme";
import { TypographyColor } from "../types/TypographyColor";
import { TypographyProps } from "./Typography";

const useTypographyStyles = makeStyles<TypographyProps>(
	(
		theme,
		{ color = "initial", variant = "body", family = "default", align = "left", noWrap = false, lineClamp = false },
	) => {
		const DEFAULT_COLOR = theme.palette.text.primary;

		const COLOR_TO_PALETTE_MAP = new Map<TypographyColor, Color3>([
			["initial", DEFAULT_COLOR],
			["primary", theme.palette.primary.main],
			["secondary", theme.palette.accent.main],
			["textPrimary", theme.palette.text.primary],
			["textSecondary", theme.palette.text.secondary],
			["error", theme.palette.status.error.main],
			["warning", theme.palette.status.warning.main],
		]);

		const COLOR_TO_PALETTE = (color: TypographyColor, parent?: Instance): Color3 => {
			if (color === "inherit" && parent) {
				if (parent.IsA("TextLabel") || parent.IsA("TextButton")) {
					return parent.TextColor3;
				}

				return DEFAULT_COLOR;
			}

			const lookup = COLOR_TO_PALETTE_MAP.get(color);

			return lookup || DEFAULT_COLOR;
		};

		const makeRootStyles = () => {
			const defaultStyles: WriteableStyle<TextLabel> = {};

			if (color) {
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

		return createStyles({
			root: makeRootStyles(),
			variantToken: {
				// eslint-disable-next-line roblox-ts/lua-truthiness
				TextSize: variant && theme.typography.fontSizes[variant],
				Font: family && theme.typography.fontFamilies[family],
			} as WriteableStyle<TextLabel>,
		});
	},
);

export default useTypographyStyles;
