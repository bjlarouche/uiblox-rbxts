/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
import { WriteableStyle } from "./WriteableStyle";
export type ClassNameMap<ClassKey extends string = string, T extends Instance = Instance> = Record<ClassKey, Partial<WriteableStyle<T>>>;
