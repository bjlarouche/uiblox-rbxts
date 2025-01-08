import { useContext, useMemo } from "@rbxts/react";
import { ThemeContext } from "theme/context";


const useTheme = () => {
	const context = useContext(ThemeContext);
	
	return useMemo(() => context, [context]);
};

export default useTheme;
