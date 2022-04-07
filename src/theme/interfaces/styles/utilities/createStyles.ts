import { ClassNameMap } from "../types/styles";

const createStyles = <ClassKey extends string = string>(styles: ClassNameMap<ClassKey>): ClassNameMap<ClassKey> => {
	return styles;
};

export default createStyles;
