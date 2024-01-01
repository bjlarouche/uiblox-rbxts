/// <reference types="@rbxts/compiler-types" />
import { WriteableStyle } from "../types/WriteableStyle";
export type GenericStyle = {
    [property: string]: boolean;
};
export type ConditionalStyles = Map<WriteableStyle<any>, boolean>;
declare const classNames: (styles: ConditionalStyles) => GenericStyle;
export default classNames;
