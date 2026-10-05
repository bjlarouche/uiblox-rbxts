import { useTheme } from "theme";
import { resolveReduced } from "ui/packages/motion/resolveReduced";

export function useReducedMotion(override?: boolean) {
	const { theme } = useTheme();
	return resolveReduced(override, theme.reducedMotion);
}
