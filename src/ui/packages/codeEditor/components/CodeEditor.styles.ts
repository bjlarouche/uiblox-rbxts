import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { focusRing } from "theme/styles/utilities/focusRing";

const useCodeEditorStyles = componentStyles<{ focused?: boolean; fieldHeight: number }>(
	"CodeEditor",
	(theme: Theme, { focused = false, fieldHeight }) => {
		const pad = theme.padding.calc(2);
		const textSize = theme.typography.fontSizes.caption ?? theme.typography.fontSizes.body;
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, 0, 0, 0),
				BackgroundColor3: theme.palette.surface.paper,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			stroke: {
				Color: theme.palette.divider,
				ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
				Thickness: 1,
				Transparency: 0,
				...(focused ? focusRing(theme.palette.focus) : {}),
			} as WriteableStyle<UIStroke>,
			corner: {
				CornerRadius: new UDim(0, theme.shape.borderRadius),
			} as WriteableStyle<UICorner>,
			padding: {
				PaddingTop: new UDim(0, pad),
				PaddingBottom: new UDim(0, pad),
				PaddingLeft: new UDim(0, pad),
				PaddingRight: new UDim(0, pad),
			} as WriteableStyle<UIPadding>,
			stack: {
				FillDirection: Enum.FillDirection.Vertical,
				HorizontalAlignment: Enum.HorizontalAlignment.Left,
				SortOrder: Enum.SortOrder.LayoutOrder,
				Padding: new UDim(0, theme.padding.calc(1)),
			} as WriteableStyle<UIListLayout>,
			bar: {
				AutomaticSize: Enum.AutomaticSize.Y,
				Size: new UDim2(1, 0, 0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				LayoutOrder: 0,
			} as WriteableStyle<Frame>,
			barRow: {
				FillDirection: Enum.FillDirection.Horizontal,
				HorizontalAlignment: Enum.HorizontalAlignment.Right,
				VerticalAlignment: Enum.VerticalAlignment.Center,
				SortOrder: Enum.SortOrder.LayoutOrder,
			} as WriteableStyle<UIListLayout>,
			field: {
				Size: new UDim2(1, 0, 0, fieldHeight),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: Enum.Font.RobotoMono,
				TextSize: textSize,
				TextColor3: theme.palette.text.primary,
				PlaceholderColor3: theme.palette.text.secondary,
				TextXAlignment: Enum.TextXAlignment.Left,
				TextYAlignment: Enum.TextYAlignment.Top,
				TextWrapped: true,
				ClearTextOnFocus: false,
				LayoutOrder: 1,
			} as WriteableStyle<TextBox>,
		});
	},
);

export default useCodeEditorStyles;
