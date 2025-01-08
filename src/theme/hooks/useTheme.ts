import { useContext } from "@rbxts/react";
import { ThemeContext } from "theme/context";

function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw error("Missing ThemeProvider");
	return context;
}

export default useTheme;