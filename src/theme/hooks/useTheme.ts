import { useContext, useMemo } from "@rbxts/react";
import { themeContext } from "theme/context";


const useTheme = (): {
} => {
	const context = useContext(themeContext);
	
	return useMemo(() => (context), [context]);
};

export default useTheme;
