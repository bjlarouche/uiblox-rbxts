import { createStyles, componentStyles, WriteableStyle } from "theme";
import { IconButtonProps } from "./IconButton";

const useIconButtonStyles = componentStyles<IconButtonProps>("IconButton", (theme, props) => {
	const getIconSize = (props: IconButtonProps) => {
		const { size } = props;

		switch (size) {
			case "xxs":
				return new UDim2(0, theme.spacing.calc(1), 0, theme.spacing.calc(1));
			case "xs":
				return new UDim2(0, theme.spacing.calc(1.5), 0, theme.spacing.calc(1.5));
			case "sm":
				return new UDim2(0, theme.spacing.calc(2), 0, theme.spacing.calc(2));
			case "md":
				return new UDim2(0, theme.spacing.calc(3), 0, theme.spacing.calc(3));
			case "lg":
				return new UDim2(0, theme.spacing.calc(4), 0, theme.spacing.calc(4));
			case "xl":
				return new UDim2(0, theme.spacing.calc(5), 0, theme.spacing.calc(5));
			default:
				return new UDim2(0, theme.spacing.calc(2), 0, theme.spacing.calc(2));
		}
	};

	return createStyles({
		container: {
			Size: getIconSize(props),
			BackgroundColor3: theme.palette.primary.main,
			ImageColor3: theme.palette.text.primary,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 12000,
		} as WriteableStyle<Frame>,
	});
});

export default useIconButtonStyles;
