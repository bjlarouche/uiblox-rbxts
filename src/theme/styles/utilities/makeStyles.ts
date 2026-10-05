import DefaultTheme from "theme/themes";
import { Theme } from "theme/interfaces/theme";
import { ClassNameMap } from "../types/styles";
import { useTheme } from "theme/hooks";
import { createStyleCache, styleDepsKey } from "./styleCache";

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
	const read = createStyleCache<ClassNameMap<ClassKey>>();
	return (props?: TVariantProps<Props>): ClassNameMap<ClassKey> => {
		let theme = DefaultTheme;
		try {
			theme = useTheme().theme ?? DefaultTheme;
		} catch {
			theme = DefaultTheme;
		}
		const record = props as object | undefined;
		return read(theme, styleDepsKey(record), () => f(theme, (props ?? {}) as Props));
	};
};

export default makeStyles;
