globalThis.typeOf = (value) => (typeof value === "object" && value !== null ? "table" : typeof value);
globalThis.math = { huge: Infinity };

const { breakpointName, orientationName } = await import("../src/hooks/breakpoints.ts");

if (breakpointName(599) !== "phone" || breakpointName(600) !== "tablet" || breakpointName(959) !== "tablet") {
	throw new Error("narrow breakpoints");
}
if (breakpointName(960) !== "desktop" || breakpointName(Number.NaN) !== "phone") throw new Error("wide breakpoint");
if (orientationName(100, 200) !== "portrait" || orientationName(200, 100) !== "landscape") {
	throw new Error("orientation");
}
if (orientationName(100, 100) !== "landscape") throw new Error("square orientation");

console.log("breakpoints ok");
