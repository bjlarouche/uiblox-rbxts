import DefaultTheme from "../../themes";
import { Theme } from "../../interfaces/theme";
import { ClassNameMap } from "../types/styles";
import { themeProducer } from "theme/components/ThemeProducer";

type TMakeStyles<ClassKey extends string = string> = (theme: Theme) => ClassNameMap<ClassKey>;
type TMakeStylesWithProps<Props, ClassKey extends string = string> = (
	theme: Theme,
	props: Props,
) => ClassNameMap<ClassKey>;

type TVariantF<Props> = keyof Props extends never ? TMakeStyles : TMakeStylesWithProps<Props>;
type TVariantProps<Props> = keyof Props extends never ? unknown : Props;

const makeStyles = <Props = {}, ClassKey extends string = string>(
	f: TVariantF<Props>,
): keyof Props extends never ? () => ClassNameMap<ClassKey> : (props: Props) => ClassNameMap<ClassKey> => {
	return (props?: TVariantProps<Props>): ClassNameMap<ClassKey> => {
		try {
			const theme = themeProducer.getState();
			return f(theme ?? DefaultTheme, (props ?? {}) as Props);
		} catch (e) {
			return f(DefaultTheme, (props ?? {}) as Props);
		}
	};
};

export default makeStyles;
