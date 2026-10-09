import { createStyles, componentStyles, WriteableStyle } from "theme";
import { TypographyColor } from "../types/TypographyColor";
import { TypographyProps } from "./Typography";

const useTypographyStyles = componentStyles<TypographyProps>("Typography", 
	(
		theme,
		{ color = "initial", variant = "body", family, align = "left", noWrap = false, lineClamp = false },
	) => {
		const spec = theme.typography.variants[variant ?? "body"];
		const resolvedFamily = family ?? spec.family;
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
			defaultStyles.TextTruncate = noWrap ? Enum.TextTruncate.AtEnd : Enum.TextTruncate.None;
			defaultStyles.TextYAlignment = Enum.TextYAlignment.Top;
			defaultStyles.ClipsDescendants = lineClamp;

			defaultStyles.BackgroundTransparency = 1;
			defaultStyles.BorderSizePixel = 0;
			defaultStyles.Size = new UDim2(1, 0, 1, 0);

			return defaultStyles;
		};

		return createStyles({
			root: makeRootStyles(),
			variantToken: {
				TextSize: spec.size,
				LineHeight: spec.leading,
				Font: theme.typography.fontFamilies[resolvedFamily],
			} as WriteableStyle<TextLabel>,
		});
	},
);

export default useTypographyStyles;
