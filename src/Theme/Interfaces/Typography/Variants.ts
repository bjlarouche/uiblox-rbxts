import { Tokens } from "../tokens/Tokens";

export type TypographyTokens = { [key in Tokens]: string };

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

export const TypographyWeights: TypographyWeights = {
	title: 800,
	heading: 500,
	body: 300,
};

export const TypographyTokens: TypographyTokens = {
	120: "64px",
	110: "48px",
	100: "40px",
	90: "32px",
	80: "28px",
	70: "24px",
	60: "20px",
	50: "18px",
	40: "16px",
	30: "14px",
	20: "12px",
	10: "10px",
};
