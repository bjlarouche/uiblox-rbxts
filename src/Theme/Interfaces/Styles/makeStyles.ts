import { DefaultTheme, Theme } from "Theme";
import { ClassNameMap } from "./styles";

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
		return f(DefaultTheme, (props ?? {}) as Props);
	};
};

export default makeStyles;
