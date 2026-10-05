globalThis.typeIs = (value, typeName) => typeof value === typeName;

const { containerMaxPx } = await import("../src/ui/packages/layout/components/containerWidth.ts");

if (containerMaxPx() !== 1200) throw new Error("default lg");
if (containerMaxPx("sm") !== 600) throw new Error("sm");
if (containerMaxPx("xs") !== 444) throw new Error("xs");
if (containerMaxPx(false) !== undefined) throw new Error("fluid");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "sm", "fluid"]) {
	if (!stateMatrix.some((row) => row.component === "Container" && row.name.includes(name))) {
		throw new Error(`Container missing ${name}`);
	}
}

console.log("container ok");
