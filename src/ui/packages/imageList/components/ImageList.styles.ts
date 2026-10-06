import { Common, componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { imageListCell, imageListCols, imageListGap } from "./imageListLayout";

const useImageListStyles = componentStyles<{ cols?: number; gap?: number; itemSize?: number; aspect?: number }>(
	"ImageList",
	(theme: Theme, { cols, gap, itemSize, aspect }) => {
		const columns = imageListCols(cols);
		const cell = imageListCell(itemSize, aspect);
		const pad = theme.spacing.calc(imageListGap(gap));
		const bar = theme.spacing.calc(2.5);
		const span = columns * cell.width + math.max(0, columns - 1) * pad;
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: UDim2.fromOffset(span, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			flow: {
				FillDirection: Enum.FillDirection.Horizontal,
				Wraps: true,
				Padding: new UDim(0, pad),
				SortOrder: Enum.SortOrder.LayoutOrder,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Top,
			} as WriteableStyle<UIListLayout>,
			tile: {
				Size: UDim2.fromOffset(cell.width, cell.height),
				BackgroundColor3: theme.palette.surface.input,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				ClipsDescendants: true,
			} as WriteableStyle<ImageButton>,
			selected: {
				Color: theme.palette.primary.main,
				Thickness: 2,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			} as WriteableStyle<UIStroke>,
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
				BackgroundColor3: theme.palette.backdrop,
				BackgroundTransparency: 0.35,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies.default,
				TextSize: theme.typography.fontSizes.caption,
				TextColor3: Common.White,
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
