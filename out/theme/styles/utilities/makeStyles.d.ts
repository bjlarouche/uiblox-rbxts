import { Theme } from "../../interfaces/Theme";
import { ClassNameMap } from "../types/styles";
type TMakeStyles<ClassKey extends string = string> = (theme: Theme) => ClassNameMap<ClassKey>;
type TMakeStylesWithProps<Props, ClassKey extends string = string> = (theme: Theme, props: Props) => ClassNameMap<ClassKey>;
type TVariantF<Props> = keyof Props extends never ? TMakeStyles : TMakeStylesWithProps<Props>;
declare const makeStyles: <Props = {}, ClassKey extends string = string>(f: TVariantF<Props>) => keyof Props extends never ? () => ClassNameMap<ClassKey> : (props: Props) => ClassNameMap<ClassKey>;
export default makeStyles;
