import React, { PropsWithChildren, useEffect, useMemo, useState } from "@rbxts/react";
import { DEFAULT_THEME } from "theme/constants";
import { Theme } from "theme/interfaces";

export const ThemeContext = React.createContext<{
	theme: Theme;
	setTheme?: React.Dispatch<React.SetStateAction<Theme>>;
}>({ theme: DEFAULT_THEME });

export interface ThemeProviderProps {
	initialTheme?: Theme;
}

export function ThemeProvider(props: PropsWithChildren<ThemeProviderProps>) {
	const { initialTheme } = props;

	const [theme, setTheme] = useState<Theme>(initialTheme ?? DEFAULT_THEME);

	useEffect(() => {
		setTheme(initialTheme ?? DEFAULT_THEME);
	}, [initialTheme]);

	const memoizedValue = useMemo(() => {
		return {
			theme,
			setTheme,
		};
	}, [theme]);

	return (
		<ThemeContext.Provider value={memoizedValue}>{props.children}</ThemeContext.Provider>
	);
}

export default ThemeProvider;
