import { useState } from "@rbxts/react";
import { ControlSize, Theme, controlMetrics, useTheme } from "theme";

export function editorPad(theme: Theme) {
	return theme.padding.calc(1);
}

/** Same height as the Input these rows host, so the label and the field share one center. */
export function editorRowHeight(theme: Theme, size?: ControlSize) {
	return controlMetrics(theme.density, size).height;
}

export function editorText(theme: Theme) {
	return {
		Font: theme.typography.fontFamilies.default,
		TextSize: theme.typography.fontSizes.caption,
		TextTruncate: Enum.TextTruncate.AtEnd,
		TextXAlignment: Enum.TextXAlignment.Left,
		TextYAlignment: Enum.TextYAlignment.Center,
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
