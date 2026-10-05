const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
if (stateMatrix.filter((row) => row.component === "Switch" && row.name.includes("accent")).length !== 2) {
	throw new Error("Switch missing accent");
}

console.log("switch ok");
