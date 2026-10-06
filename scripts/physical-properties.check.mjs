const { patchPhysicalParts, physicalCaption, physicalFields, physicalRows } = await import(
	"../src/ui/packages/physicalPropertiesEditor/components/physicalParts.ts"
);
if (physicalFields().join(",") !== "Density,Friction,Elasticity,FrictionWeight,ElasticityWeight") {
	throw new Error("fields");
}
if (physicalCaption("FrictionWeight") !== "Friction wt" || physicalCaption("ElasticityWeight") !== "Elasticity wt") {
	throw new Error("captions");
}
if (physicalRows().map((row) => row.join("+")).join("|") !== "Density+Friction|Elasticity+FrictionWeight|ElasticityWeight") {
	throw new Error("rows");
}
const parts = patchPhysicalParts(1, 2, 3, 4, 5, "Friction", 9);
if (parts.join(",") !== "1,9,3,4,5") throw new Error("patch");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled", "narrow"]) {
	if (
		stateMatrix.filter((row) => row.component === "PhysicalPropertiesEditor" && row.name.includes(name)).length !== 2
	) {
		throw new Error(`PhysicalPropertiesEditor missing ${name}`);
	}
}
const narrowPhysical = stateMatrix.filter((row) => row.component === "PhysicalPropertiesEditor" && row.name.includes("narrow"));
if (narrowPhysical.some((row) => row.width !== 320)) throw new Error("PhysicalPropertiesEditor narrow width");

console.log("physical properties ok");
