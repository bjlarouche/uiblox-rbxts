globalThis.typeOf = (value) => (typeof value === "object" && value !== null ? "table" : typeof value);
globalThis.math = { huge: Infinity };

const { breakpointName, orientationName, resolveResponsive } = await import("../src/hooks/breakpoints.ts");

if (breakpointName(599) !== "phone" || breakpointName(600) !== "tablet" || breakpointName(959) !== "tablet") {
	throw new Error("narrow breakpoints");
}
if (breakpointName(960) !== "desktop" || breakpointName(Number.NaN) !== "phone") throw new Error("wide breakpoint");
if (orientationName(100, 200) !== "portrait" || orientationName(200, 100) !== "landscape") {
	throw new Error("orientation");
}
if (orientationName(100, 100) !== "landscape") throw new Error("square orientation");
if (resolveResponsive(12, 1000) !== 12) throw new Error("plain value");
if (resolveResponsive({ phone: 1, tablet: 2 }, 500) !== 1) throw new Error("phone value");
if (resolveResponsive({ phone: 1, tablet: 2 }, 700) !== 2) throw new Error("tablet value");
if (resolveResponsive({ phone: 1, tablet: 2 }, 1000) !== 2) throw new Error("desktop fallback");
if (resolveResponsive({ desktop: 3 }, 100) !== undefined) throw new Error("missing phone");

console.log("breakpoints ok");
