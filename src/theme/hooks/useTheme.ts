import { useEffect, useMemo, useState } from "@rbxts/react";
import { themeProducer } from "../context/ThemeProducer";
import { Theme } from "theme/interfaces";

const useTheme = (): {
	theme: Theme;
	setTheme: (theme: Theme) => void;
} => {
	const [theme, setTheme] = useState<Theme>(themeProducer.getState());

	useEffect(() => {
		const unsubscribeFn = themeProducer.subscribe((state, _previousState) => {
			setTheme(state);
		});

		return () => {
			unsubscribeFn();
		};
	});

	const memoizedSetTheme = useMemo(() => themeProducer.setTheme, [themeProducer.setTheme]);

	return useMemo(() => ({ theme, setTheme: memoizedSetTheme }), [theme, setTheme]);
};
export default useTheme;
