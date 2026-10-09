import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useDrawerStyles = componentStyles<{ width?: number }>("Drawer", (theme: Theme, { width }) => {
	const heading = theme.typography.variants.h6;
	return createStyles({
		root: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ZIndex: 30000,
		} as WriteableStyle<Frame>,
		backdrop: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.backdrop,
			BackgroundTransparency: 0.45,
			BorderSizePixel: 0,
			Text: "",
			AutoButtonColor: false,
			ZIndex: 30000,
		} as WriteableStyle<TextButton>,
		panel: {
			Size: new UDim2(0, width !== undefined && width > 0 ? width : theme.spacing.calc(20), 1, 0),
			BackgroundColor3: theme.palette.surface.elevated,
			BorderSizePixel: 0,
			ZIndex: 30001,
		} as WriteableStyle<Frame>,
		title: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextWrapped: true,
			Font: theme.typography.fontFamilies[heading.family],
			TextSize: heading.size,
			LineHeight: heading.leading,
			TextColor3: theme.palette.text.primary,
			TextXAlignment: Enum.TextXAlignment.Left,
			ZIndex: 30002,
		} as WriteableStyle<TextLabel>,
	});
});

export default useDrawerStyles;
