import { WriteableStyle } from "./WriteableStyle";

export type ConditionalStylesMap<T extends Instance> = Map<WriteableStyle<T>, boolean>;