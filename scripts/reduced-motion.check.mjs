const { resolveReduced } = await import("../src/ui/packages/motion/resolveReduced.ts");

if (resolveReduced(undefined, undefined) !== false) throw new Error("default");
if (resolveReduced(undefined, true) !== true) throw new Error("theme");
if (resolveReduced(false, true) !== false) throw new Error("prop wins");
if (resolveReduced(true, false) !== true) throw new Error("prop on");

console.log("reduced motion ok");
