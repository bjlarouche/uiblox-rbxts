import { relativeLuminance } from "theme/utilites/colorMath";

interface SkeletonPalette {
	surface: { canvas: Color3; elevated: Color3 };
	action: { hover: Color3 };
	text: { secondary: Color3 };
}

/** Bone + shimmer peak from semantic tokens; shine always lifts off the bone vs canvas. */
export function skeletonTone(theme: { palette: SkeletonPalette }) {
	const lightCanvas = relativeLuminance(theme.palette.surface.canvas) > 0.5;
	return {
		bone: theme.palette.action.hover,
		shine: lightCanvas ? theme.palette.surface.elevated : theme.palette.text.secondary,
	};
}
