import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";

const useStepperStyles = componentStyles("Stepper", (theme: Theme) =>
	createStyles({
		root: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
		} as WriteableStyle<Frame>,
		list: {
			FillDirection: Enum.FillDirection.Horizontal,
			Padding: new UDim(0, theme.padding.calc(1)),
			SortOrder: Enum.SortOrder.LayoutOrder,
		} as WriteableStyle<UIListLayout>,
		step: {
			AutomaticSize: Enum.AutomaticSize.XY,
			Size: UDim2.fromScale(0, 0),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextColor3: theme.palette.text.secondary,
		} as WriteableStyle<TextLabel>,
		active: { TextColor3: theme.palette.primary.main } as WriteableStyle<TextLabel>,
		complete: { TextColor3: theme.palette.text.primary } as WriteableStyle<TextLabel>,
	}),
);

export default useStepperStyles;
