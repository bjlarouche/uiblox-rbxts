import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useAvatarStyles = componentStyles<{ size?: number }>("Avatar", (theme: Theme, { size = 40 }) =>
	createStyles({
		root: {
			Size: UDim2.fromOffset(size, size),
			BackgroundColor3: theme.palette.primary.main,
			BorderSizePixel: 0,
			ClipsDescendants: true,
		} as WriteableStyle<Frame>,
		image: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<ImageLabel>,
		text: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: math.max(12, size * 0.4),
			TextColor3: theme.palette.primary.on,
		} as WriteableStyle<TextLabel>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
	}),
);

export default useAvatarStyles;
