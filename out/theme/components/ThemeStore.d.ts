/// <reference types="rodux" />
import { Theme } from "../interfaces/Theme";
import { Store } from "@rbxts/rodux";
export type ThemeState = {
    theme: Theme;
};
export type ThemeAction = {
    type: "set";
    newTheme?: Theme;
};
export declare const themeReducer: import("@rbxts/rodux").Reducer<ThemeState, ThemeAction>;
export declare const themeStore: Store<ThemeState, ThemeAction>;
export type TThemeStore = typeof themeStore;
export declare const selectTheme: import("@rbxts/roselect").OutputSelector<ThemeState, Theme, (res: Theme) => Theme>;
