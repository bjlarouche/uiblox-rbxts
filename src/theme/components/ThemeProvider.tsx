import { markPureComponent } from "@rbxts/roact-hooked";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import Roact from "@rbxts/roact";
import { Theme } from "../interfaces/theme";
import { themeStore } from "./ThemeStore";
import ThemeWrapper from "./ThemeWrapper";

export interface ThemeProviderProps {
	theme?: Theme;
}

function ThemeProvider(props: Roact.PropsWithChildren<ThemeProviderProps>) {
	const { theme, [Roact.Children]: children } = props;

	return (
		<StoreProvider store={themeStore}>
			<ThemeWrapper theme={theme}>{children}</ThemeWrapper>
		</StoreProvider>
	);
}

export default markPureComponent(ThemeProvider);
