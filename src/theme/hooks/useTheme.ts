import { useCallback, useMemo, useState } from "@rbxts/react";
import { themeProducer } from "../context/ThemeProducer";
import { Theme } from "theme/interfaces";

const useTheme = (): {
	theme: Theme;
	setTheme: (theme: Theme) => void;
} => {
	const [theme, setTheme] = useState<Theme>(themeProducer.getState());

	themeProducer.subscribe((state, _previousState) => {
		setTheme(state);
	});

	const setProducerTheme = useCallback(
		(t: Theme) => {
			themeProducer.setTheme(t);
		},
		[setTheme],
	);

	return useMemo(() => ({ theme, setTheme: setProducerTheme }), [theme, setTheme]);
};
export default useTheme;
