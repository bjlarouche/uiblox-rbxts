import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useStepperStyles = componentStyles<{ orientation?: "horizontal" | "vertical" }>(
	"Stepper",
	(theme: Theme, { orientation = "horizontal" }) => {
		const heading = theme.typography.variants.h6;
		return createStyles({
			root: {
				AutomaticSize: orientation === "vertical" ? Enum.AutomaticSize.Y : Enum.AutomaticSize.XY,
				Size: orientation === "vertical" ? new UDim2(1, 0, 0, 0) : UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
			} as WriteableStyle<Frame>,
			list: {
				FillDirection:
					orientation === "vertical" ? Enum.FillDirection.Vertical : Enum.FillDirection.Horizontal,
				Padding: new UDim(0, theme.padding.calc(1)),
				SortOrder: Enum.SortOrder.LayoutOrder,
			} as WriteableStyle<UIListLayout>,
			step: {
				AutomaticSize: orientation === "vertical" ? Enum.AutomaticSize.Y : Enum.AutomaticSize.XY,
				Size: orientation === "vertical" ? new UDim2(1, 0, 0, 0) : UDim2.fromScale(0, 0),
				BackgroundTransparency: 1,
				BorderSizePixel: 0,
				Font: theme.typography.fontFamilies[heading.family],
				TextSize: heading.size,
				LineHeight: heading.leading,
				TextWrapped: true,
				TextColor3: theme.palette.text.secondary,
			} as WriteableStyle<TextLabel>,
			active: { TextColor3: theme.palette.primary.main } as WriteableStyle<TextLabel>,
			complete: { TextColor3: theme.palette.text.primary } as WriteableStyle<TextLabel>,
			error: { TextColor3: theme.palette.status.error.main } as WriteableStyle<TextLabel>,
		});
	},
);

export default useStepperStyles;
