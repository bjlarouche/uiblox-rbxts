import { createStyles, componentStyles, WriteableStyle } from "theme";
import { IconButtonProps } from "./IconButton";
import { iconButtonScale } from "./iconButtonBox";

const useIconButtonStyles = componentStyles<IconButtonProps>("IconButton", (theme, props) => {
	const extent = theme.spacing.calc(iconButtonScale(props.size));

	return createStyles({
		container: {
			Size: new UDim2(0, extent, 0, extent),
			BackgroundColor3: theme.palette.primary.main,
			ImageColor3: theme.palette.text.primary,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 12000,
		} as WriteableStyle<Frame>,
		corner: {
			CornerRadius: new UDim(theme.shape.pillScale / 2, 0),
		} as WriteableStyle<UICorner>,
	});
});

export default useIconButtonStyles;
