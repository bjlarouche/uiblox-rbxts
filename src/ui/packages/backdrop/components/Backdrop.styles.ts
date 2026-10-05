import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useBackdropStyles = componentStyles<{ invisible?: boolean }>("Backdrop", (theme: Theme, { invisible }) =>
	createStyles({
		root: {
			Size: UDim2.fromScale(1, 1),
			BackgroundColor3: theme.palette.backdrop,
			BackgroundTransparency: invisible === true ? 1 : 0.45,
			BorderSizePixel: 0,
			Text: "",
			AutoButtonColor: false,
			Selectable: false,
			ZIndex: 30000,
		} as WriteableStyle<TextButton>,
	}),
);

export default useBackdropStyles;
