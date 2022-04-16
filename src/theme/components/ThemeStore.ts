import { Theme } from "../interfaces/theme";
import { createReducer, Store } from "@rbxts/rodux";
import { createSelector } from "@rbxts/roselect";
import { default as DefaultTheme } from "../themes";

export type ThemeState = { theme: Theme };
export type ThemeAction = { type: "set"; newTheme?: Theme };

export const themeReducer = createReducer<ThemeState, ThemeAction>(
	{ theme: DefaultTheme },
	{
		set: ({ theme }, { newTheme }) => ({
			theme: newTheme ?? theme,
		}),
	},
);

export const themeStore = new Store<ThemeState, ThemeAction>(themeReducer);
export type TThemeStore = typeof themeStore;

export const selectTheme = createSelector(
	(state: ThemeState) => state.theme,
	(theme) => theme,
);
