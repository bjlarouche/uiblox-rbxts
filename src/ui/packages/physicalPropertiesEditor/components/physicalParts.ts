export type PhysicalField = "Density" | "Friction" | "Elasticity" | "FrictionWeight" | "ElasticityWeight";

export function physicalFields(): PhysicalField[] {
	return ["Density", "Friction", "Elasticity", "FrictionWeight", "ElasticityWeight"];
}

export function physicalCaption(field: PhysicalField) {
	if (field === "FrictionWeight") return "Friction wt";
	if (field === "ElasticityWeight") return "Elasticity wt";
	return field;
}

export function physicalRows(): PhysicalField[][] {
	return [
		["Density", "Friction"],
		["Elasticity", "FrictionWeight"],
		["ElasticityWeight"],
	];
}

export function patchPhysicalParts(
	density: number,
	friction: number,
	elasticity: number,
	frictionWeight: number,
	elasticityWeight: number,
	field: PhysicalField,
	amount: number,
) {
	const parts = [density, friction, elasticity, frictionWeight, elasticityWeight];
	const index =
		field === "Density"
			? 0
			: field === "Friction"
				? 1
				: field === "Elasticity"
					? 2
					: field === "FrictionWeight"
						? 3
						: 4;
	parts[index] = amount;
	return parts;
}
