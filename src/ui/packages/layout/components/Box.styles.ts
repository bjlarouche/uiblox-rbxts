import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { BoxPad, boxPadSides } from "./boxPad";

export type BoxBg = "transparent" | "paper" | "elevated" | "input";

const useBoxStyles = componentStyles<{ padding?: BoxPad; bgcolor?: BoxBg }>(
	"Box",
	(theme: Theme, { padding, bgcolor = "transparent" }) => {
		const sides = boxPadSides(padding);
		const fill =
			bgcolor === "paper"
				? theme.palette.surface.paper
				: bgcolor === "elevated"
					? theme.palette.surface.elevated
					: bgcolor === "input"
						? theme.palette.surface.input
						: theme.palette.surface.paper;
		return createStyles({
			root: {
				AutomaticSize: Enum.AutomaticSize.XY,
				Size: UDim2.fromScale(0, 0),
				BackgroundColor3: fill,
				BackgroundTransparency: bgcolor === "transparent" ? 1 : 0,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			padding: {
				PaddingTop: new UDim(0, theme.spacing.calc(sides.top)),
				PaddingRight: new UDim(0, theme.spacing.calc(sides.right)),
				PaddingBottom: new UDim(0, theme.spacing.calc(sides.bottom)),
				PaddingLeft: new UDim(0, theme.spacing.calc(sides.left)),
			} as WriteableStyle<UIPadding>,
		});
	},
);

export default useBoxStyles;
