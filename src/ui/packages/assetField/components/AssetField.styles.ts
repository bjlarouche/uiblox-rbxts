import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

const useAssetFieldStyles = componentStyles("AssetField", (theme: Theme) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, 0),
			AutomaticSize: Enum.AutomaticSize.Y,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Vertical,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		preview: {
			Size: UDim2.fromOffset(theme.spacing.calc(4), theme.spacing.calc(4)),
			BackgroundColor3: theme.palette.surface.input,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
		} as WriteableStyle<ImageLabel>,
		corner: {
			CornerRadius: new UDim(0, theme.shape.borderRadius),
		} as WriteableStyle<UICorner>,
	}),
);

export default useAssetFieldStyles;
