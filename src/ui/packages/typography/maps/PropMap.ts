import { DefaultTheme } from "theme";
import { TypographyColor } from "../types/TypographyColor";

const DEFAULT_COLOR = DefaultTheme.palette.text.primary;
// Map of room size to stud dimensions
export const COLOR_TO_PALLETTE_MAP = new Map<TypographyColor, Color3>([
	["initial", DEFAULT_COLOR],
	["primary", DefaultTheme.palette.primary.main],
	["secondary", DefaultTheme.palette.secondary.main],
	["textPrimary", DefaultTheme.palette.text.primary],
	["textSecondary", DefaultTheme.palette.text.secondary],
	["error", DefaultTheme.palette.error.main],
	["warning", DefaultTheme.palette.warning.main],
]);

export const COLOR_TO_PALETTE = (color: TypographyColor, parent?: Instance): Color3 => {
	if (color === "inherit" && parent) {
		if (parent.IsA("TextLabel") || parent.IsA("TextButton")) {
			return parent.TextColor3;
		}

		return DEFAULT_COLOR;
	}

	const lookup = COLOR_TO_PALLETTE_MAP.get(color);

	return lookup || DEFAULT_COLOR;
};
