import { createStyles, componentStyles, WriteableStyle } from "theme";
import { IconProps } from "./Icon";

const useIconStyles = componentStyles<IconProps>("Icon", (theme, props) => {
	const getIconSize = (props: IconProps) => {
		const { size } = props;
		if (typeIs(size, "number")) return UDim2.fromOffset(size, size);

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
		} as WriteableStyle<ImageLabel>,
	});
});

export default useIconStyles;
