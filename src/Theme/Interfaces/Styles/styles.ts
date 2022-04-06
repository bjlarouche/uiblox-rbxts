import { WritableStyle } from "./WriteableStyles";

export type ClassNameMap<ClassKey extends string = string, T extends Instance = Instance> = Record<
	ClassKey,
	Partial<WritableStyle<T>>
>;
