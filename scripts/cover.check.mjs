const { coverFill } = await import("../src/ui/packages/cover/components/coverFill.ts");

if (coverFill(undefined) !== 0 || coverFill(0) !== 0 || coverFill(-0.2) !== 0) throw new Error("clear cover");
if (coverFill(1) !== 1 || coverFill(1.4) !== 1) throw new Error("full cover");
if (coverFill(0.4) !== 0.4) throw new Error("partial cover");

console.log("cover ok");
