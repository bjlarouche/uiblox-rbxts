import { createStyles, makeStyles } from "theme";
import { IconButtonProps } from "./IconButton";

const useIconButtonStyles = makeStyles<IconButtonProps>((theme, props) => {
	const getIconSize = (props: IconButtonProps) => {
		const { size } = props;

		switch (size) {
			case "xxs":
				return new UDim2(0, theme.spacing.calc(0.5), 0, theme.spacing.calc(0.5));
			case "xs":
				return new UDim2(0, theme.spacing.calc(1), 0, theme.spacing.calc(1));
			case "sm":
				return new UDim2(0, theme.spacing.calc(2), 0, theme.spacing.calc(2));
			case "md":
				return new UDim2(0, theme.spacing.calc(3), 0, theme.spacing.calc(3));
			case "lg":
				return new UDim2(0, theme.spacing.calc(6), 0, theme.spacing.calc(6));
			case "xl":
				return new UDim2(0, theme.spacing.calc(8), 0, theme.spacing.calc(8));
			default:
				return new UDim2(0, theme.spacing.calc(2), 0, theme.spacing.calc(2));
		}
	};

	return createStyles({
		container: {
			Size: getIconSize(props),
			BackgroundColor3: theme.palette.secondary.main,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 12000,
		} as Partial<WritableInstanceProperties<Frame>>,
	});
});

export default useIconButtonStyles;
