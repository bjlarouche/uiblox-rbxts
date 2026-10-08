const { stepPress, stepState } = await import("../src/ui/packages/stepper/components/stepState.ts");
if (stepPress(0, 2) !== 0 || stepPress(2, 2) !== 2) throw new Error("reached step");
if (stepPress(3, 2) !== undefined || stepPress(-1, 2) !== undefined) throw new Error("later step");
if (stepState(0, 2) !== "complete" || stepState(2, 2) !== "active" || stepState(3, 2) !== "pending") {
	throw new Error("step state");
}
if (stepState(1, 1, 1) !== "error") throw new Error("error step");
if (stepState(0, 1, 1) !== "complete" || stepState(2, 1, 1) !== "pending") throw new Error("error neighbors");
if (stepState(1, 1) !== "active") throw new Error("error omitted");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["first", "middle", "last", "vertical"]) {
	if (stateMatrix.filter((row) => row.component === "Stepper" && row.name.includes(name)).length !== 2) {
		throw new Error(`Stepper missing ${name}`);
	}
}

console.log("stepper ok");
