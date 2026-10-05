export function motionDuration(duration: number, reducedMotion?: boolean) {
	if (reducedMotion === true || duration !== duration || duration <= 0) return 0;
	return duration;
}

export function assignGoal(target: object, goal: object) {
	const record = target as Record<string, unknown>;
	for (const [key, value] of pairs(goal as Record<string, unknown>)) {
		record[key as string] = value;
	}
}
