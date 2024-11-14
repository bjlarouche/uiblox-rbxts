import { markPureComponent } from "@rbxts/roact-hooked";
import { StoreProvider } from "@rbxts/roact-rodux-hooked";
import Roact from "@rbxts/roact";
import { Theme } from "../interfaces/theme";
import { themeStore } from "./ThemeStore";
import ThemeWrapper from "./ThemeWrapper";
import { CustomizedProps } from "theme/types";

export interface ThemeProviderProps {
	theme?: Theme;
}

function ThemeProvider(props: CustomizedProps<Instance, ThemeProviderProps>) {
	const { theme, children } = props;

	return (
		<StoreProvider store={themeStore}>
			<ThemeWrapper theme={theme}>{children}</ThemeWrapper>
		</StoreProvider>
	);
}

export default markPureComponent(ThemeProvider);
