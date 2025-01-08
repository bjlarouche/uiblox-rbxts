import React, {  StrictMode, useEffect } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";
import { DEFAULT_THEME } from "theme/constants";
import { Theme } from "theme/interfaces";
import { CustomizedProps } from "theme/types";
import { themeProducer } from "./ThemeProducer";

export interface ThemeProviderProps {
	theme?: Theme;
}

function ThemeProvider(props: CustomizedProps<Instance, ThemeProviderProps>) {
	const { theme = DEFAULT_THEME, children } = props;

	// When theme prop changes
	useEffect(() => {
		themeProducer.setTheme(theme);
	}, [theme]);

	return (
		<StrictMode>
			<ReflexProvider producer={themeProducer}>{children}</ReflexProvider>
		</StrictMode>
	);
}

export default ThemeProvider;
