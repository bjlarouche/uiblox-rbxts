const { drawerAnchor } = await import("../src/ui/packages/drawer/components/drawerPlacement.ts");
if (drawerAnchor("left") !== 0 || drawerAnchor("right") !== 1) throw new Error("placement");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["closed", "left", "right", "wide"]) {
	if (stateMatrix.filter((row) => row.component === "Drawer" && row.name.includes(name)).length !== 2) {
		throw new Error(`Drawer missing ${name}`);
	}
}

console.log("drawer ok");
