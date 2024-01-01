import { ClassNameMap } from "../types/styles";
declare const createStyles: <ClassKey extends string = string>(styles: ClassNameMap<ClassKey>) => ClassNameMap<ClassKey>;
export default createStyles;
