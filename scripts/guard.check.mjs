globalThis.typeOf = (value) => (typeof value === "object" && value !== null ? "table" : typeof value);
globalThis.math = { huge: Infinity };

const { isFiniteNumber, finiteOr, positiveDimension } = await import("../src/foundation/guard.ts");

if (!isFiniteNumber(1) || isFiniteNumber("1") || isFiniteNumber(Number.NaN) || isFiniteNumber(Infinity)) {
	throw new Error("finite number");
}
if (isFiniteNumber(-Infinity) || isFiniteNumber(undefined) || isFiniteNumber(null)) {
	throw new Error("finite rejects non-numbers");
}
if (finiteOr(Number.NaN, 4) !== 4 || finiteOr(2, 4) !== 2 || finiteOr(undefined, 9) !== 9) {
	throw new Error("finite fallback");
}
if (positiveDimension(0, 8) !== 8 || positiveDimension(-3, 8) !== 8 || positiveDimension(12, 8) !== 12) {
	throw new Error("positive dimension");
}
if (positiveDimension(Number.NaN, 8) !== 8 || positiveDimension(Infinity, 8) !== 8) {
	throw new Error("positive dimension edges");
}

console.log("guard ok");
