const { patchPhysicalParts, physicalFields } = await import(
	"../src/ui/packages/physicalPropertiesEditor/components/physicalParts.ts"
);
if (physicalFields().join(",") !== "Density,Friction,Elasticity,FrictionWeight,ElasticityWeight") {
	throw new Error("fields");
}
const parts = patchPhysicalParts(1, 2, 3, 4, 5, "Friction", 9);
if (parts.join(",") !== "1,9,3,4,5") throw new Error("patch");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled"]) {
	if (
		stateMatrix.filter((row) => row.component === "PhysicalPropertiesEditor" && row.name.includes(name)).length !== 2
	) {
		throw new Error(`PhysicalPropertiesEditor missing ${name}`);
	}
}

console.log("physical properties ok");
