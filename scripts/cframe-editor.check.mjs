const { nextCFrameParts, cframeAxis, cframeFields } = await import("../src/ui/packages/cframeEditor/components/cframeValue.ts");
if (cframeFields().join(",") !== "X,Y,Z,RX,RY,RZ") throw new Error("fields");
if (cframeFields().map(cframeAxis).join(",") !== "X,Y,Z,X,Y,Z") throw new Error("axis labels");
const parts = nextCFrameParts(1, 2, 3, 10, 20, 30, "RY", 45);
if (parts.join(",") !== "1,2,3,10,45,30") throw new Error("patch");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled"]) {
	if (stateMatrix.filter((row) => row.component === "CFrameEditor" && row.name.includes(name)).length !== 2) {
		throw new Error(`CFrameEditor missing ${name}`);
	}
}
const narrowCFrame = stateMatrix.filter((row) => row.component === "CFrameEditor" && row.name.includes("narrow"));
if (narrowCFrame.length !== 2 || narrowCFrame.some((row) => row.width !== 320)) throw new Error("CFrameEditor narrow width");

console.log("cframe editor ok");
