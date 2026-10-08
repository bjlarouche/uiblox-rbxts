const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEKDAY_OFFSET = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];

export interface DateSpan {
	start?: number;
	finish?: number;
}

export function isLeapYear(year: number) {
	return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function daysInMonth(year: number, month: number) {
	if (month === 2 && isLeapYear(year)) return 29;
	return MONTH_LENGTHS[month - 1] ?? 30;
}

/** Sunday is 0. */
export function weekday(year: number, month: number, day: number) {
	let adjusted = year;
	if (month < 3) adjusted -= 1;
	const sum =
		adjusted +
		math.floor(adjusted / 4) -
		math.floor(adjusted / 100) +
		math.floor(adjusted / 400) +
		WEEKDAY_OFFSET[month - 1] +
		day;
	return sum % 7;
}

export function dateStamp(year: number, month: number, day: number) {
	return year * 10000 + month * 100 + day;
}

export function shiftMonth(year: number, month: number, delta: number) {
	const index = year * 12 + (month - 1) + delta;
	let nextYear = math.floor(index / 12);
	let remainder = index % 12;
	if (remainder < 0) {
		remainder += 12;
		nextYear -= 1;
	}
	return { year: nextYear, month: remainder + 1 };
}

export function orderSpan(first: number, second: number): DateSpan {
	return first <= second ? { start: first, finish: second } : { start: second, finish: first };
}

export function dayIndex(stamp: number) {
	const year = math.floor(stamp / 10000);
	const month = math.floor(stamp / 100) % 100;
	const day = stamp % 100;
	let index = day;
	for (let cursor = 1; cursor < year; cursor++) index += isLeapYear(cursor) ? 366 : 365;
	for (let cursor = 1; cursor < month; cursor++) index += daysInMonth(year, cursor);
	return index;
}

export function nightsBetween(start: number, finish: number) {
	return math.abs(dayIndex(finish) - dayIndex(start));
}

export function formatStamp(stamp: number) {
	const month = math.floor(stamp / 100) % 100;
	const day = stamp % 100;
	return `${MONTHS[month - 1] ?? "Day"} ${day}`;
}

export function formatSpan(value: DateSpan) {
	if (value.start === undefined) return "Choose dates";
	if (value.finish === undefined) return formatStamp(value.start);
	return `${formatStamp(value.start)} – ${formatStamp(value.finish)}`;
}

/** Inverse of dayIndex. Day 1 is 1 Jan of year 1. */
export function stampFromIndex(index: number) {
	let left = index;
	let year = 1;
	while (left > (isLeapYear(year) ? 366 : 365)) {
		left -= isLeapYear(year) ? 366 : 365;
		year += 1;
	}
	let month = 1;
	while (month < 12 && left > daysInMonth(year, month)) {
		left -= daysInMonth(year, month);
		month += 1;
	}
	return dateStamp(year, month, left);
}

export function shiftDay(stamp: number, delta: number) {
	return stampFromIndex(dayIndex(stamp) + delta);
}

/** Seven stamps, Sunday through Saturday, containing the day. */
export function weekStamps(stamp: number) {
	const year = math.floor(stamp / 10000);
	const month = math.floor(stamp / 100) % 100;
	const day = stamp % 100;
	const origin = dayIndex(stamp) - weekday(year, month, day);
	const week = new Array<number>();
	for (let offset = 0; offset < 7; offset++) week.push(stampFromIndex(origin + offset));
	return week;
}
