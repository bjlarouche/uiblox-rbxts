const { alertAction } = await import("../src/ui/packages/alert/components/alertAction.ts");
if (alertAction() !== undefined || alertAction("") !== undefined) throw new Error("empty action");
if (alertAction("Retry") !== "Retry") throw new Error("action");

const { alertSeverity } = await import("../src/ui/packages/alert/components/alertTone.ts");
if (alertSeverity() !== "info" || alertSeverity("error") !== "error") throw new Error("severity default");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["info", "success", "warning", "error", "filled", "square"]) {
	if (!stateMatrix.some((row) => row.component === "Alert" && row.name.includes(name))) {
		throw new Error(`Alert missing ${name}`);
	}
}

console.log("alert ok");
