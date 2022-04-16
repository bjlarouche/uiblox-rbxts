import { hooked } from "@rbxts/roact-hooked";
import { Provider } from "@rbxts/roact-rodux-hooked";
import Roact from "@rbxts/roact";
import { Theme } from "../interfaces/theme";
import { themeStore } from "./ThemeStore";
import ThemeWrapper from "./ThemeWrapper";

export interface ThemeProviderProps {
	theme?: Theme;
}

const ThemeProvider = hooked<ThemeProviderProps>((props) => {
	const { theme, [Roact.Children]: children } = props;
	return (
		<Provider store={themeStore}>
			<ThemeWrapper theme={theme}>{children}</ThemeWrapper>
		</Provider>
	);
});

export default ThemeProvider;
