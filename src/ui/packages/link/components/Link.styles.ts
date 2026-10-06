import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type LinkColor = "primary" | "inherit" | "error";
export type LinkUnderline = "always" | "hover" | "none";

function linkColor(theme: Theme, color: LinkColor, disabled: boolean): Color3 {
	if (disabled) return theme.palette.text.disabled;
	if (color === "error") return theme.palette.status.error.main;
	if (color === "inherit") return theme.palette.text.primary;
	return theme.palette.primary.main;
}

const useLinkStyles = componentStyles<{
	color?: LinkColor;
	disabled?: boolean;
}>("Link", (theme: Theme, { color = "primary", disabled = false }) => {
	const ink = linkColor(theme, color, disabled);
	return createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Active: !disabled,
			Selectable: !disabled,
			RichText: true,
			TextColor3: ink,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: Enum.TextXAlignment.Left,
		} as WriteableStyle<TextButton>,
	});
});

export default useLinkStyles;
