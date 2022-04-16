import { hooked, useEffect, useRef } from "@rbxts/roact-hooked";
import { useDispatch, useSelector } from "@rbxts/roact-rodux-hooked";
import Roact from "@rbxts/roact";
import { Theme } from "../interfaces/theme";
import { selectTheme, TThemeStore } from "./ThemeStore";
import { default as DefaultTheme } from "../themes";

export interface ThemeWrapperProps {
	theme?: Theme;
}

const ThemeWrapper = hooked<ThemeWrapperProps>((props) => {
	const { theme, [Roact.Children]: children } = props;
	const dispatch = useDispatch<TThemeStore>();
	const ref = useRef<Frame>();
	const currentTheme = useSelector(selectTheme);

	// When theme changes
	useEffect(() => {
		dispatch({ type: "set", newTheme: theme ?? DefaultTheme });
	}, [theme]);

	return (
		<frame
			Key={`ThemeWrapper-${currentTheme.type}`}
			BackgroundTransparency={1}
			Size={new UDim2(1, 0, 1, 0)}
			ZIndex={500000}
			Ref={ref}
		>
			{currentTheme && children}
		</frame>
	);
});

export default ThemeWrapper;
