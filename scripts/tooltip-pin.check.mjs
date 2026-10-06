const { pointerInside } = await import("../src/ui/packages/tooltip/components/tooltipPointer.ts");

if (!pointerInside(10, 20, 16, 16, 18, 28)) throw new Error("inside pin");
if (!pointerInside(10, 20, 16, 16, 26, 36)) throw new Error("inside edge");
if (pointerInside(10, 20, 16, 16, 27, 28)) throw new Error("outside x");
if (pointerInside(10, 20, 16, 16, 18, 37)) throw new Error("outside y");
if (pointerInside(10, 20, 16, 16, Number.NaN, 28)) throw new Error("nan");

console.log("tooltip pin ok");
