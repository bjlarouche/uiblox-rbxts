const { patchRayParts } = await import("../src/ui/packages/rayEditor/components/rayParts.ts");
const parts = patchRayParts(1, 2, 3, 4, 5, 6, "DY", 9);
if (parts.join(",") !== "1,2,3,4,9,6") throw new Error("patch");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "RayEditor" && row.name.includes(name)).length !== 2) {
		throw new Error(`RayEditor missing ${name}`);
	}
}

console.log("ray editor ok");
