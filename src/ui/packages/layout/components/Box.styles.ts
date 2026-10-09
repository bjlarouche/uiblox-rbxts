import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

export type BoxBg = "transparent" | "paper" | "elevated" | "input";

const useBoxStyles = componentStyles<{ bgcolor?: BoxBg }>("Box", (theme: Theme, { bgcolor = "transparent" }) => {
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
	});
});

export default useBoxStyles;
