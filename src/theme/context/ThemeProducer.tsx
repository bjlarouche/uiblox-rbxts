import { createProducer } from "@rbxts/reflex";
import { DEFAULT_THEME } from "theme/constants";
import { Theme } from "../interfaces/theme";


export const themeProducer = createProducer(DEFAULT_THEME, {
	setTheme: (_state, theme: Theme) => theme
});

export type ThemeProducer = typeof themeProducer;
