import { useContext, useEffect, useState } from "@rbxts/react";
import { ThemeContext } from "../context/ThemeProvider";
import { themeProducer } from "../context/ThemeProducer";
import { readScopedTheme } from "../context/themeScope";
import { Theme } from "theme/interfaces";

const useTheme = (): {
	theme: Theme;
	setTheme: (theme: Theme) => void;
} => {
	const provided = useContext(ThemeContext);
	const [fallbackTheme, setFallbackTheme] = useState<Theme>(themeProducer.getState());

	useEffect(() => {
		if (provided) return;
		const unsubscribeFn = themeProducer.subscribe((state) => {
			setFallbackTheme(state);
		});
		return () => {
			unsubscribeFn();
		};
	}, [provided]);

	return readScopedTheme(provided, { theme: fallbackTheme, setTheme: themeProducer.setTheme });
};

export default useTheme;
