import { useContext } from "@rbxts/react";
import { ThemeContext } from "theme/context";

export default function useTheme() {
	return useContext(ThemeContext);
}
