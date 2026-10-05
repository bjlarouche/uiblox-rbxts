import { createStyles, makeStyles, Theme, WriteableStyle } from "theme";

const useModalStyles = makeStyles((theme: Theme) =>
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
			Selectable: false,
			ZIndex: 30000,
		} as WriteableStyle<TextButton>,
		surface: {
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: UDim2.fromScale(0.5, 0.5),
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundColor3: theme.palette.surface.paper,
			BorderSizePixel: 0,
			ZIndex: 30001,
		} as WriteableStyle<Frame>,
		padding: {
			PaddingTop: new UDim(0, theme.padding.calc(2)),
			PaddingBottom: new UDim(0, theme.padding.calc(2)),
			PaddingLeft: new UDim(0, theme.padding.calc(2)),
			PaddingRight: new UDim(0, theme.padding.calc(2)),
		} as WriteableStyle<UIPadding>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	}),
);

export default useModalStyles;
