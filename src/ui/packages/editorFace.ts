import { useState } from "@rbxts/react";
import { Theme, useTheme } from "theme";

export function editorPad(theme: Theme) {
	return theme.padding.calc(1);
}

export function editorText(theme: Theme) {
	return {
		Font: theme.typography.fontFamilies.default,
		TextSize: theme.typography.fontSizes.caption,
		TextTruncate: Enum.TextTruncate.AtEnd,
		TextXAlignment: Enum.TextXAlignment.Left,
	};
}

export function useEditorHover(disabled?: boolean) {
	const { theme } = useTheme();
	const [hovering, setHovering] = useState(false);
	const active = hovering && disabled !== true;
	return {
		active,
		face: {
			BackgroundColor3: theme.palette.action.hover,
			BackgroundTransparency: active ? 0 : 1,
		},
		event: {
			MouseEnter: () => setHovering(true),
			MouseLeave: () => setHovering(false),
		},
	};
}
