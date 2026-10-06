export interface TimeOfDay {
	hour: number;
	minute: number;
}

const DAY = 1440;

function modDay(total: number) {
	const remainder = total % DAY;
	return remainder < 0 ? remainder + DAY : remainder;
}

export function timeToMinutes(value: TimeOfDay) {
	return value.hour * 60 + value.minute;
}

/** Snap to a minute step. Wrap into the day, or reject an invalid range. */
export function resolveTime(value: TimeOfDay, step = 1, wrap = true, min?: number, max?: number): TimeOfDay | undefined {
	if (step <= 0) return undefined;
	if (min !== undefined && max !== undefined && min > max) return undefined;
	const size = math.max(1, math.floor(step));
	let total = math.floor((value.hour * 60 + value.minute) / size + 0.5) * size;
	if (wrap) total = modDay(total);
	else if (total < 0 || total >= DAY) return undefined;
	if (min !== undefined && total < min) return undefined;
	if (max !== undefined && total > max) return undefined;
	return { hour: math.floor(total / 60), minute: total % 60 };
}

export function timeRangeOk(start: TimeOfDay, finish: TimeOfDay) {
	return timeToMinutes(finish) > timeToMinutes(start);
}
