import { Theme } from "../interfaces/theme";
import { default as DefaultTheme } from "../themes";
import { InferState, combineProducers, createProducer } from "@rbxts/reflex";


export const themeProducer = createProducer(DefaultTheme, {
	setTheme: (_state, theme: Theme) => theme
});

export type ThemeProducer = typeof themeProducer;

export type ThemeState = InferState<ThemeProducer>;