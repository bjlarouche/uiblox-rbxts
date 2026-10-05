import { Theme } from "theme/interfaces/theme";
import { ClassNameMap } from "../types/styles";
import { propsWithDefaults, slotsWithOverrides } from "./componentTheme";
import makeStyles from "./makeStyles";

type TMakeStyles<ClassKey extends string = string> = (theme: Theme) => ClassNameMap<ClassKey>;
type TMakeStylesWithProps<Props, ClassKey extends string = string> = (
	theme: Theme,
	props: Props,
) => ClassNameMap<ClassKey>;
type TVariantF<Props> = keyof Props extends never ? TMakeStyles : TMakeStylesWithProps<Props>;

const componentStyles = <Props = {}, ClassKey extends string = string>(
	name: string,
	factory: TVariantF<Props>,
): keyof Props extends never ? () => ClassNameMap<ClassKey> : (props: Props) => ClassNameMap<ClassKey> => {
	return makeStyles<Props, ClassKey>(((theme: Theme, props: Props) => {
		const spec = theme.components?.[name];
		const merged = propsWithDefaults(
			spec?.defaultProps,
			props as unknown as { [key: string]: unknown } | undefined,
		) as Props;
		const paint = factory as (theme: Theme, props: Props) => ClassNameMap<ClassKey>;
		return slotsWithOverrides(paint(theme, merged), spec?.styleOverrides) as ClassNameMap<ClassKey>;
	}) as TVariantF<Props>);
};

export default componentStyles;
