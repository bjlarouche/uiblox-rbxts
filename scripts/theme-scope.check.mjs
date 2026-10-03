const { readScopedTheme } = await import("../src/theme/context/themeScope.ts");

const dark = { theme: "dark", setTheme: () => {} };
const light = { theme: "light", setTheme: () => {} };
const fallback = { theme: "fallback", setTheme: () => {} };
if (readScopedTheme(dark, fallback).theme !== "dark") throw new Error("provider theme was ignored");
if (readScopedTheme(undefined, fallback).theme !== "fallback") throw new Error("fallback was ignored");
if (readScopedTheme(light, fallback).theme === readScopedTheme(dark, fallback).theme) {
	throw new Error("sibling providers collapsed to one theme");
}
console.log("theme scope ok");
