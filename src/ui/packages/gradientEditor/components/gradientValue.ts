export interface GradientValue {
	color: ColorSequence;
	transparency: NumberSequence;
	rotation: number;
	offset: Vector2;
	enabled: boolean;
}

export function patchGradientRotation(value: GradientValue, rotation: number): GradientValue {
	return {
		color: value.color,
		transparency: value.transparency,
		rotation,
		offset: value.offset,
		enabled: value.enabled,
	};
}

export function patchGradientEnabled(value: GradientValue, enabled: boolean): GradientValue {
	return {
		color: value.color,
		transparency: value.transparency,
		rotation: value.rotation,
		offset: value.offset,
		enabled,
	};
}
