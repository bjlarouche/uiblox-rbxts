export function clampUnit(value: number) {
	if (value !== value) return 0;
	if (value < 0) return 0;
	if (value > 1) return 1;
	return value;
}

export function stopOnce(destroy: () => void) {
	let stopped = false;
	return () => {
		if (stopped) return;
		stopped = true;
		destroy();
	};
}

export function progressUnit(value?: number, progress?: number) {
	if (value !== undefined) return clampUnit(value);
	if (progress !== undefined) return clampUnit(progress / 100);
	return 0;
}

export function progressSpin(indeterminate: boolean, reducedMotion?: boolean, disabled?: boolean) {
	if (!indeterminate || reducedMotion === true || disabled === true) return false;
	return "spin" as const;
}

export function arcKeys(value: number) {
	const span = clampUnit(value);
	if (span <= 0) {
		return [
			{ time: 0, transparency: 1 },
			{ time: 1, transparency: 1 },
		];
	}
	if (span >= 1) {
		return [
			{ time: 0, transparency: 0 },
			{ time: 1, transparency: 0 },
		];
	}
	const edge = span > 0.001 ? span - 0.001 : 0;
	return [
		{ time: 0, transparency: 0 },
		{ time: edge, transparency: 0 },
		{ time: span, transparency: 1 },
		{ time: 1, transparency: 1 },
	];
}

/** Indeterminate ring: long clear trail, bright head — reads as a sweep. */
export function spinArcKeys() {
	return [
		{ time: 0, transparency: 1 },
		{ time: 0.45, transparency: 1 },
		{ time: 0.7, transparency: 0.55 },
		{ time: 0.88, transparency: 0 },
		{ time: 0.96, transparency: 0.35 },
		{ time: 1, transparency: 1 },
	];
}
