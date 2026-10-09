export function focusRing(color: Color3) {
	return {
		Color: color,
		Thickness: 2,
		ApplyStrokeMode: Enum.ApplyStrokeMode.Border,
	};
}

/** One disabled fade for checkbox, switch, radio, and slider. */
export const controlFade = 0.5;
