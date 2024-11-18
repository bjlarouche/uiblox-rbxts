import React, { StrictMode } from "@rbxts/react";
import { Theme } from "../interfaces/theme";
import ThemeWrapper from "./ThemeWrapper";
import { CustomizedProps } from "theme/types";
import { ReflexProvider } from "@rbxts/react-reflex";
import { themeProducer } from "./ThemeProducer";

export interface ThemeProviderProps {
	theme?: Theme;
}

function ThemeProvider(props: CustomizedProps<Instance, ThemeProviderProps>) {
	const { theme, children } = props;

	return (
		<StrictMode>
			<ReflexProvider producer={themeProducer}>
				<ThemeWrapper theme={theme}>{children}</ThemeWrapper>
			</ReflexProvider>
		</StrictMode>
	);
}

export default ThemeProvider;
