import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useDrawerStyles = componentStyles<{ width?: number }>("Drawer", (theme: Theme, { width }) =>
	createStyles({
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
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(2)),
			PaddingBottom: new UDim(0, theme.padding.calc(2)),
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
	}),
);

export default useDrawerStyles;
