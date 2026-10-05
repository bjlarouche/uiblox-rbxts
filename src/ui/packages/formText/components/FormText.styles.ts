import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useFormTextStyles = componentStyles<{ hasError?: boolean; disabled?: boolean }>(
	"FormText",
	(theme: Theme, { hasError = false, disabled = false }) => {
		const color = disabled
			? theme.palette.text.disabled
			: hasError
				? theme.palette.status.error.main
				: theme.palette.text.secondary;
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				TextColor3: color,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption,
				TextXAlignment: Enum.TextXAlignment.Left,
				TextWrapped: true,
			} as WriteableStyle<TextLabel>,
		});
	},
);

export default useFormTextStyles;
