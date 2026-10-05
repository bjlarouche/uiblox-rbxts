const { writeRectParts, rectFields } = await import("../src/ui/packages/rectEditor/components/rectValue.ts");
if (rectFields().join(",") !== "MinX,MinY,MaxX,MaxY") throw new Error("fields");
const parts = writeRectParts(0, 1, 2, 3, "MaxX", 9);
if (parts.join(",") !== "0,1,9,3") throw new Error("patch");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "RectEditor" && row.name.includes(name)).length !== 2) {
		throw new Error(`RectEditor missing ${name}`);
	}
}

console.log("rect editor ok");
