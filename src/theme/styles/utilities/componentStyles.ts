import { Theme } from "theme/interfaces/theme";
import { ClassNameMap } from "../types/styles";
import { propsWithDefaults, slotsWithOverrides } from "./componentTheme";
import makeStyles from "./makeStyles";
import { applyVariants } from "./variants";

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
		let slots = paint(theme, merged) as ClassNameMap<ClassKey> & { [slot: string]: object };
		if (spec?.variants !== undefined || (spec?.compoundVariants?.size() ?? 0) > 0) {
			slots = applyVariants(
				slots,
				merged as unknown as { [prop: string]: unknown },
				spec?.variants ?? {},
				spec?.compoundVariants ?? [],
			) as ClassNameMap<ClassKey> & { [slot: string]: object };
		}
		return slotsWithOverrides(slots, spec?.styleOverrides) as ClassNameMap<ClassKey>;
	}) as TVariantF<Props>);
};

export default componentStyles;
