import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const alertStyles = readFileSync(join(root, "src/ui/packages/alert/components/Alert.styles.ts"), "utf8");
if (!alertStyles.includes("TextWrapped: true") || !alertStyles.includes("text.primary")) throw new Error("alert text stays in the pad");
const badgeStyles = readFileSync(join(root, "src/ui/packages/badge/components/Badge.styles.ts"), "utf8");
if (!badgeStyles.includes("tone.on") || badgeStyles.includes("text.inverse")) throw new Error("badge uses the tone ink");
const chipStyles = readFileSync(join(root, "src/ui/packages/chip/components/Chip.styles.ts"), "utf8");
if (!chipStyles.includes("TextWrapped: true") || !chipStyles.includes("status.on")) throw new Error("chip wraps on the tone");

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
