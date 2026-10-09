import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type MarkdownEditorMode = "split" | "edit" | "preview";

const useMarkdownEditorStyles = componentStyles<{ fullscreen?: boolean; compact?: boolean }>(
	"MarkdownEditor",
	(theme: Theme, { fullscreen, compact }) => {
		const pad = compact === true || theme.density === "compact" ? theme.padding.calc(1) : theme.padding.calc(1.5);
		return createStyles({
			root: {
				Size: fullscreen === true ? UDim2.fromScale(1, 1) : new UDim2(1, 0, 1, 0),
				BackgroundColor3: theme.palette.surface.paper,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			content: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			stroke: {
				Color: theme.palette.divider,
				Thickness: 1,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
			} as WriteableStyle<UIStroke>,
			layout: {
				FillDirection: Enum.FillDirection.Vertical,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Top,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, 0),
			} as WriteableStyle<UIListLayout>,
			toolbar: {
				Size: new UDim2(1, 0, 0, compact === true || theme.density === "compact" ? 32 : 36),
				BackgroundColor3: theme.palette.surface.elevated,
				BorderSizePixel: 0,
				LayoutOrder: 1,
			} as WriteableStyle<Frame>,
			toolbarPad: {
				PaddingLeft: new UDim(0, pad),
				PaddingRight: new UDim(0, pad),
				PaddingTop: new UDim(0, theme.padding.calc(0.5)),
				PaddingBottom: new UDim(0, theme.padding.calc(0.5)),
			} as WriteableStyle<UIPadding>,
			toolbarRow: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
			spacer: {
				Size: new UDim2(1, 0, 1, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				LayoutOrder: 50,
			} as WriteableStyle<Frame>,
			body: {
				Size: new UDim2(1, 0, 1, -(compact === true || theme.density === "compact" ? 32 : 36)),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				LayoutOrder: 2,
			} as WriteableStyle<Frame>,
			pane: {
				Size: UDim2.fromScale(0.5, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			paneFull: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			editor: {
				Size: UDim2.fromScale(1, 1),
				BackgroundColor3: theme.palette.surface.input,
				BorderSizePixel: 0,
				ClearTextOnFocus: false,
				MultiLine: true,
				TextXAlignment: Enum.TextXAlignment.Left,
				TextYAlignment: Enum.TextYAlignment.Top,
				TextWrapped: true,
				Font: Enum.Font.RobotoMono,
				TextSize: theme.typography.fontSizes.body,
				TextColor3: theme.palette.text.primary,
				PlaceholderColor3: theme.palette.text.secondary,
			} as WriteableStyle<TextBox>,
			editorPad: {
				PaddingTop: new UDim(0, pad),
				PaddingBottom: new UDim(0, pad),
				PaddingLeft: new UDim(0, pad),
				PaddingRight: new UDim(0, pad),
			} as WriteableStyle<UIPadding>,
			previewScroll: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				ScrollBarThickness: 4,
				CanvasSize: new UDim2(0, 0, 0, 0),
				AutomaticCanvasSize: Enum.AutomaticSize.Y,
			} as WriteableStyle<ScrollingFrame>,
			previewPad: {
				PaddingTop: new UDim(0, pad),
				PaddingBottom: new UDim(0, pad),
				PaddingLeft: new UDim(0, pad),
				PaddingRight: new UDim(0, pad),
			} as WriteableStyle<UIPadding>,
			split: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				VerticalAlignment: Enum.VerticalAlignment.Top,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, 0),
			} as WriteableStyle<UIListLayout>,
			divider: {
				Size: new UDim2(0, 1, 1, 0),
				BackgroundColor3: theme.palette.divider,
				BorderSizePixel: 0,
				LayoutOrder: 2,
			} as WriteableStyle<Frame>,
			resizeGrip: {
				AnchorPoint: new Vector2(1, 1),
				Position: UDim2.fromScale(1, 1),
				Size: UDim2.fromOffset(22, 22),
				BackgroundColor3: theme.palette.surface.elevated,
				BackgroundTransparency: 0.15,
				BorderSizePixel: 0,
				AutoButtonColor: false,
				ZIndex: 20,
			} as WriteableStyle<TextButton>,
			resizeMark: {
				AnchorPoint: new Vector2(0.5, 0.5),
				BackgroundColor3: theme.palette.text.secondary,
				BorderSizePixel: 0,
				Rotation: -45,
				ZIndex: 21,
			} as WriteableStyle<Frame>,
			resizeOverlay: {
				Size: UDim2.fromScale(1, 1),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Active: true,
				ZIndex: 30,
			} as WriteableStyle<Frame>,
		});
	},
);

export default useMarkdownEditorStyles;
