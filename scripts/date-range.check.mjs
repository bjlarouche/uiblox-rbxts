globalThis.math = { abs: Math.abs, floor: Math.floor, min: Math.min, max: Math.max };

const {
	dateStamp,
	dayIndex,
	daysInMonth,
	formatSpan,
	nightsBetween,
	orderSpan,
	shiftMonth,
	shiftDay,
	stampFromIndex,
	weekday,
	weekStamps,
} = await import("../src/ui/packages/dateRange/dateRangeValue.ts");

if (daysInMonth(2026, 2) !== 28) throw new Error("common february");
if (daysInMonth(2024, 2) !== 29) throw new Error("leap february");
if (daysInMonth(2026, 10) !== 31) throw new Error("october");
if (weekday(2026, 10, 5) !== 1) throw new Error("monday");
if (weekday(2026, 10, 1) !== 4) throw new Error("thursday");
if (dateStamp(2026, 10, 5) !== 20261005) throw new Error("stamp");

const back = shiftMonth(2026, 1, -1);
if (back.year !== 2025 || back.month !== 12) throw new Error("previous january");
const forward = shiftMonth(2026, 12, 1);
if (forward.year !== 2027 || forward.month !== 1) throw new Error("next december");

const flipped = orderSpan(20261020, 20261012);
if (flipped.start !== 20261012 || flipped.finish !== 20261020) throw new Error("ordered span");
if (nightsBetween(20261005, 20261008) !== 3) throw new Error("same month nights");
if (nightsBetween(20261028, 20261102) !== 5) throw new Error("cross month nights");
if (nightsBetween(20261008, 20261005) !== 3) throw new Error("reverse nights");
if (formatSpan({}) !== "Choose dates") throw new Error("empty span");
if (formatSpan({ start: 20261005, finish: 20261008 }) !== "Oct 5 – Oct 8") throw new Error("span label");
if (stampFromIndex(dayIndex(20261006)) !== 20261006) throw new Error("stamp round trip");
if (shiftDay(20261031, 1) !== 20261101) throw new Error("next day");
const week = weekStamps(20261006);
if (week.length !== 7 || week[0] !== 20261004 || week[6] !== 20261010) throw new Error("week bounds");
if (!week.includes(20261006)) throw new Error("week contains the day");
if (weekStamps(20261004)[0] !== week[0] || weekStamps(20261010)[0] !== week[0]) throw new Error("same week");

const { readFileSync } = await import("node:fs");
const picker = readFileSync("src/ui/packages/dateRange/components/DateRangePicker.tsx", "utf8");
if (!picker.includes("fieldChrome") || !picker.includes("TextTruncate")) throw new Error("range field matches the input chrome");
if (picker.includes("fromOffset(36") || !picker.includes("new UDim2(1 / 7, -pad, 0, row)")) {
	throw new Error("seven columns fit the grid");
}

console.log("date range ok");
