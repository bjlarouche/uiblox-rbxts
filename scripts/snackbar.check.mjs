import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

String.prototype.size = function size() {
	return this.length;
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const toastStyles = readFileSync(join(root, "src/ui/packages/toast/components/Toast.styles.ts"), "utf8");
const container = toastStyles.match(/container:\s*\{[\s\S]*?\}\s*as WriteableStyle<Frame>/)?.[0] ?? "";
if (!/Position:\s*ACTIVE_POSITION/.test(container)) throw new Error("toast must mount at active inset");
if (/Position:\s*INACTIVE_POSITION/.test(container)) throw new Error("toast must not mount below the canvas");

const { snackbarActionLabel } = await import("../src/ui/packages/snackbar/components/snackbarAction.ts");
if (snackbarActionLabel(undefined) !== undefined) throw new Error("missing action");
if (snackbarActionLabel("") !== undefined) throw new Error("empty action");
if (snackbarActionLabel("Undo") !== "Undo") throw new Error("action");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["open", "closed", "action"]) {
	if (stateMatrix.filter((row) => row.component === "Snackbar" && row.name.includes(name)).length !== 2) {
		throw new Error(`Snackbar missing ${name}`);
	}
}

console.log("snackbar ok");
