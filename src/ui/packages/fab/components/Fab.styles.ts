import { componentStyles, createStyles, Theme, WriteableStyle } from "theme";
import { FabSize, fabPixels } from "./fabSize";

export interface FabStyleProps {
	size?: FabSize;
	disabled?: boolean;
}

const useFabStyles = componentStyles<FabStyleProps>("Fab", (theme: Theme, { size = "medium", disabled }) => {
	const diameter = fabPixels(size);
	return createStyles({
		root: {
			Size: UDim2.fromOffset(diameter, diameter),
			BackgroundColor3: theme.palette.primary.main,
			BackgroundTransparency: disabled ? 0.5 : 0,
			BorderSizePixel: 0,
			AutoButtonColor: false,
			Text: "",
			ZIndex: 12000,
		} as WriteableStyle<TextButton>,
		corner: {
			CornerRadius: new UDim(1, 0),
		} as WriteableStyle<UICorner>,
		icon: {
			Size: UDim2.fromScale(1, 1),
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ImageColor3: theme.palette.primary.on,
			ImageTransparency: disabled ? 0.5 : 0,
		} as WriteableStyle<ImageLabel>,
	});
});

export default useFabStyles;
