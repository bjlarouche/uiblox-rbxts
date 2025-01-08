import React, { PropsWithChildren, useEffect, useReducer } from "@rbxts/react";
import themeReducer from "./reducer";
import { ThemeDispatch, ThemeState } from "theme/types";
import { INITIAL_THEME_STATE } from "theme/constants";
import { ThemeActionTypes } from "theme/enums";
import { Theme } from "theme/interfaces";

export const ThemeContext = React.createContext<{
	state: ThemeState;
	dispatch: ThemeDispatch | undefined;
}>({ state: INITIAL_THEME_STATE, dispatch: undefined });

export interface ThemeProviderProps {
	theme?: Theme;
}

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
	const { theme } = props;

	const [state, dispatch] = useReducer(themeReducer, {
		...INITIAL_THEME_STATE,
		theme: theme || INITIAL_THEME_STATE.theme,
	});

	useEffect(() => {
		dispatch({ type: ThemeActionTypes.Hydrate });
	}, [dispatch]);

	return <ThemeContext.Provider value={{ state, dispatch }}>{props.children}</ThemeContext.Provider>;
}

export default ThemeContext;
