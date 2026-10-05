import React, { useEffect, useMemo, useState } from "@rbxts/react";
import { DEFAULT_THEME } from "theme/constants";
import { Theme } from "theme/interfaces/theme";
import { CustomizedProps } from "theme/types";
import { ThemeScope } from "./themeScope";

export const ThemeContext = React.createContext<ThemeScope<Theme> | undefined>(undefined);

export interface ThemeProviderProps {
	theme?: Theme;
}

function ThemeProvider(props: CustomizedProps<Instance, ThemeProviderProps>) {
	const { theme = DEFAULT_THEME, children } = props;
	const [current, setCurrent] = useState(theme);

	useEffect(() => {
		setCurrent(theme);
	}, [theme]);

	const value = useMemo(() => ({ theme: current, setTheme: setCurrent }), [current]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
