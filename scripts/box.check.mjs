globalThis.typeIs = (value, typeName) => typeof value === typeName;

const { boxPadSides } = await import("../src/ui/packages/layout/components/boxPad.ts");

const all = boxPadSides(2);
if (all.top !== 2 || all.left !== 2) throw new Error("uniform pad");
const xy = boxPadSides({ x: 1, y: 3 });
if (xy.left !== 1 || xy.top !== 3 || xy.right !== 1 || xy.bottom !== 3) throw new Error("xy pad");
const custom = boxPadSides({ top: 4, left: 1 });
if (custom.top !== 4 || custom.left !== 1 || custom.right !== 0) throw new Error("custom pad");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["plain", "padded", "paper"]) {
	if (!stateMatrix.some((row) => row.component === "Box" && row.name.includes(name))) {
		throw new Error(`Box missing ${name}`);
	}
}

console.log("box ok");
