import { Tokens } from "../Tokens/Tokens";
export type TypographyTokens = {
    [key in Tokens]: string;
};
export interface TypographyWeights {
    title: number;
    heading: number;
    body: number;
    xl?: number;
    lg?: number;
    md?: number;
    sm?: number;
    xs?: number;
    default?: number;
}
export type TypographyVariants = keyof TypographyWeights;
export declare const TypographyWeights: TypographyWeights;
export declare const TypographyTokens: TypographyTokens;
