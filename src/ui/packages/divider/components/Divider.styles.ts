import { createStyles, componentStyles, WriteableStyle } from "theme";
import { Orientations } from "ui/enums";
import { DividerProps } from "./Divider";

const useDividerStyles = componentStyles<DividerProps>("Divider", (theme, props) => {
	const {
		position,
		orientation = Orientations.Horizontal,
		padding = theme.padding.calc(2),
		color = theme.palette.divider,
		transparency = 0,
		weight = theme.options.constants.borders.default,
		anchorPoint = new Vector2(0, 0),
	} = props;

	return createStyles({
		shell: {
			Size: new UDim2(1, 0, 0, theme.spacing.calc(2)),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ClipsDescendants: true,
		} as WriteableStyle<Frame>,
		line: {
			Size: new UDim2(1, 0, 0, weight),
			Position: new UDim2(0, 0, 0.5, 0),
			AnchorPoint: new Vector2(0, 0.5),
			BackgroundColor3: color,
			BackgroundTransparency: transparency,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		caption: {
			AutomaticSize: Enum.AutomaticSize.X,
			Size: new UDim2(0, 0, 1, 0),
			AnchorPoint: new Vector2(0.5, 0.5),
			Position: new UDim2(0.5, 0, 0.5, 0),
			BackgroundColor3: theme.palette.surface.canvas,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.caption,
			TextColor3: theme.palette.text.secondary,
			TextTruncate: Enum.TextTruncate.AtEnd,
			TextWrapped: false,
			TextXAlignment: Enum.TextXAlignment.Center,
			ZIndex: 2,
		} as WriteableStyle<TextLabel>,
		captionPad: {
			PaddingLeft: new UDim(0, theme.padding.calc(1)),
			PaddingRight: new UDim(0, theme.padding.calc(1)),
		} as WriteableStyle<UIPadding>,
		root: {
			Position: position ?? new UDim2(0, 0, 0, 0),
			Size: new UDim2(
				orientation === Orientations.Horizontal ? 1 : 0,
				orientation === Orientations.Horizontal ? -padding * 2 : weight,
				orientation === Orientations.Vertical ? 1 : 0,
				orientation === Orientations.Vertical ? -padding * 2 : weight,
			),
			BackgroundColor3: color,
			BackgroundTransparency: transparency,
			AnchorPoint: anchorPoint,
		} as WriteableStyle<Frame>,
	});
});

export default useDividerStyles;
