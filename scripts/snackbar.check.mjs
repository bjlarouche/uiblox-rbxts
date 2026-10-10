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

const { toastPlace, toastWrap } = await import("../src/ui/packages/toast/components/toastPlace.ts");
const bottom = toastPlace(undefined, 8, 40);
if (bottom.anchorY !== 1 || bottom.activeOffset !== -8 || bottom.idleOffset !== 40) throw new Error("bottom toast");
const top = toastPlace("top", 8, 40);
if (top.anchorY !== 0 || top.activeOffset !== 8 || top.idleOffset !== -40) throw new Error("top toast");
if (toastWrap(200, 144) !== true) throw new Error("long toast wraps");
if (toastWrap(100, 144) !== false) throw new Error("short toast stays");
if (toastWrap(200, 0) !== false) throw new Error("unmeasured toast");

const { snackbarActionLabel } = await import("../src/ui/packages/snackbar/components/snackbarAction.ts");
if (snackbarActionLabel(undefined) !== undefined) throw new Error("missing action");
if (snackbarActionLabel("") !== undefined) throw new Error("empty action");
if (snackbarActionLabel("Undo") !== "Undo") throw new Error("action");

const { toastGlyph, toastHold } = await import("../src/ui/packages/toast/components/toastPlace.ts");
if (toastGlyph("success") !== "success" || toastGlyph("info") !== "info") throw new Error("toast glyph");
if (toastGlyph(undefined) !== undefined || toastGlyph("default") !== undefined) throw new Error("plain toast");
if (toastHold(1, 2, false) !== 3) throw new Error("toast hold");
if (toastHold(1, 2, true) !== 2) throw new Error("toast hold reduced");

const toastView = readFileSync(join(root, "src/ui/packages/toast/components/Toast.tsx"), "utf8");
if (toastView.includes("wait(")) throw new Error("toast wait");
if (!toastView.includes("task.delay") || !toastView.includes("task.cancel") || !toastView.includes("playProperty")) {
	throw new Error("toast timing");
}
if (!toastView.includes("motion.slow") || !toastView.includes("motion.default")) throw new Error("toast motion");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["open", "closed", "action"]) {
	if (stateMatrix.filter((row) => row.component === "Snackbar" && row.name.includes(name)).length !== 2) {
		throw new Error(`Snackbar missing ${name}`);
	}
}

console.log("snackbar ok");
