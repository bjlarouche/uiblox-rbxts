import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { imageListCols, imageListGap, imageListItemSize } from "./imageListLayout";

const useImageListStyles = componentStyles<{ cols?: number; gap?: number; itemSize?: number }>(
	"ImageList",
	(theme: Theme, { cols, gap, itemSize }) => {
		const size = imageListItemSize(itemSize);
		const pad = theme.spacing.calc(imageListGap(gap));
		const bar = theme.spacing.calc(2.5);
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			grid: {
				CellSize: UDim2.fromOffset(size, size),
				CellPadding: UDim2.fromOffset(pad, pad),
				FillDirection: Enum.FillDirection.Horizontal,
				FillDirectionMaxCells: imageListCols(cols),
				SortOrder: Enum.SortOrder.LayoutOrder,
				StartCorner: Enum.StartCorner.TopLeft,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Top,
			} as WriteableStyle<UIGridLayout>,
			tile: {
				Size: UDim2.fromOffset(size, size),
				BackgroundColor3: theme.palette.surface.input,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				ClipsDescendants: true,
				Text: "",
			} as WriteableStyle<ImageButton>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			image: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ScaleType: Enum.ScaleType.Crop,
			} as WriteableStyle<ImageLabel>,
			title: {
				Size: new UDim2(1, 0, 0, bar),
				Position: new UDim2(0, 0, 1, -bar),
				BackgroundColor3: theme.palette.surface.overlay,
				BackgroundTransparency: 0.25,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption,
				TextColor3: theme.palette.text.inverse,
				TextXAlignment: Enum.TextXAlignment.Left,
				TextTruncate: Enum.TextTruncate.AtEnd,
				ZIndex: 2,
			} as WriteableStyle<TextLabel>,
			titlePad: {
				PaddingLeft: new UDim(0, theme.spacing.calc(0.5)),
				PaddingRight: new UDim(0, theme.spacing.calc(0.5)),
			} as WriteableStyle<UIPadding>,
		});
	},
);

export default useImageListStyles;
