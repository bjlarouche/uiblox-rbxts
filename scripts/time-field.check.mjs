globalThis.math = { floor: Math.floor, max: Math.max };

const { resolveTime, timeRangeOk } = await import("../src/ui/packages/timeField/timeValue.ts");

const wrapped = resolveTime({ hour: 23, minute: 70 }, 1, true);
if (wrapped === undefined || wrapped.hour !== 0 || wrapped.minute !== 10) throw new Error("wrap");

const stepped = resolveTime({ hour: 8, minute: 10 }, 15, true);
if (stepped === undefined || stepped.hour !== 8 || stepped.minute !== 15) throw new Error("step");

if (resolveTime({ hour: 9, minute: 0 }, 15, true, 600, 480) !== undefined) throw new Error("invalid range");
if (resolveTime({ hour: 8, minute: 0 }, 15, false, 9 * 60, 17 * 60) !== undefined) throw new Error("before min");
if (resolveTime({ hour: 1, minute: 0 }, 0, true) !== undefined) throw new Error("step zero");
if (timeRangeOk({ hour: 10, minute: 0 }, { hour: 9, minute: 30 }) !== false) throw new Error("end before start");
if (timeRangeOk({ hour: 9, minute: 0 }, { hour: 9, minute: 0 }) !== false) throw new Error("zero length");
if (timeRangeOk({ hour: 9, minute: 0 }, { hour: 10, minute: 15 }) !== true) throw new Error("ordered range");

console.log("time field ok");
