export interface WeekCellScales {
	name: number;
	day: number;
	count: number;
}

/** Narrow keeps one day. A full week uses every column. */
export function weekColumnCount(count: number, narrow?: boolean) {
	if (narrow === true) return 1;
	if (count < 1) return 1;
	return count;
}

/** Name plus equal day columns. The scales sum to 1 so the row fits its parent. */
export function weekCellScales(count: number, narrow?: boolean): WeekCellScales {
	const days = weekColumnCount(count, narrow);
	const name = narrow === true ? 0.46 : 0.2;
	return { name, day: (1 - name) / days, count: days };
}
