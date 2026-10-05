import { createStyles, componentStyles, Theme, WriteableStyle } from "theme";

export interface EmptyListHintStyleProps {
	height: number;
}

const useEmptyListHintStyles = componentStyles<EmptyListHintStyleProps>("EmptyListHint", (theme: Theme, { height }) =>
	createStyles({
		root: {
			Size: new UDim2(1, 0, 0, height),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			TextColor3: theme.palette.text.secondary,
			Font: theme.typography.fontFamilies.default,
			TextSize: theme.typography.fontSizes.body,
			TextXAlignment: Enum.TextXAlignment.Center,
			TextYAlignment: Enum.TextYAlignment.Center,
			TextTruncate: Enum.TextTruncate.AtEnd,
			ZIndex: 20002,
		} as WriteableStyle<TextLabel>,
	}),
);

export default useEmptyListHintStyles;
