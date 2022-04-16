import { createStyles, makeStyles, WriteableStyle } from "theme";
import { IconProps } from "./Icon";

const useIconStyles = makeStyles<IconProps>((theme, props) => {
	const getIconSize = (props: IconProps) => {
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
			ImageColor3: theme.palette.text.primary,
			BackgroundTransparency: 1,
			BorderSizePixel: 0,
			ScaleType: Enum.ScaleType.Fit,
			ZIndex: 12000,
		} as WriteableStyle<ImageLabel>,
	});
});

export default useIconStyles;
