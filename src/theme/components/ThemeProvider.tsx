import { markPureComponent } from "@rbxts/roact-hooked";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import Roact, { FunctionComponent } from "@rbxts/roact";
import { Theme } from "../interfaces/theme";
import { themeStore } from "./ThemeStore";
import ThemeWrapper from "./ThemeWrapper";

export interface ThemeProviderProps {
	theme?: Theme;
}

const ThemeProvider: FunctionComponent<ThemeProviderProps> = (props) => {
	const { theme, [Roact.Children]: children } = props;
	return (
		<StoreProvider store={themeStore}>
			<ThemeWrapper theme={theme}>{children}</ThemeWrapper>
		</StoreProvider>
	);
};

export default markPureComponent(ThemeProvider);
