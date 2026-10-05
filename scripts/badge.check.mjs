globalThis.tostring = String;

const { badgeText } = await import("../src/ui/packages/badge/components/badgeValue.ts");
if (badgeText(3, 99) !== "3") throw new Error("count");
if (badgeText(100, 99) !== "99+") throw new Error("max");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["count", "max", "invisible"]) {
	if (stateMatrix.filter((row) => row.component === "Badge" && row.name.includes(name)).length !== 2) {
		throw new Error(`Badge missing ${name}`);
	}
}

console.log("badge ok");
