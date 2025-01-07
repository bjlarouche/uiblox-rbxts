import { createStyles, makeStyles, WriteableStyle } from "theme";
import { Orientations } from "ui/enums";
import { DividerProps } from "./Divider";

const useDividerStyles = makeStyles<DividerProps>((theme, props) => {
	const {
		position,
		orientation = Orientations.Horizontal,
		padding = theme.padding.calc(2),
		color = theme.options.constants.colors.divider,
		transparency = 0,
		weight = theme.options.constants.borders.default,
		anchorPoint = new Vector2(0,0)
	} = props;

	return createStyles({
		root: {
			Position: position ?? new UDim2(0, 0, 0, 0),
			Size: new UDim2(
				orientation === Orientations.Horizontal ? 1 : 0,
				orientation === Orientations.Horizontal ? -padding * 2 : weight,
				orientation === Orientations.Vertical ? 1 : 0,
				orientation === Orientations.Vertical ? -padding * 2 : weight,
			),
			BackgroundColor3: color || Color3.fromRGB(255, 255, 255),
			BackgroundTransparency: transparency,
			AnchorPoint: anchorPoint,
		} as WriteableStyle<Frame>,
	});
});

export default useDividerStyles;
