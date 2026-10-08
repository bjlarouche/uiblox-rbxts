import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

String.prototype.size = function size() {
	return this.length;
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const styles = readFileSync(join(root, "src/ui/packages/divider/components/Divider.styles.ts"), "utf8");
const caption = styles.match(/caption:\s*\{[\s\S]*?\}\s*as WriteableStyle<TextLabel>/)?.[0] ?? "";
if (!/TextTruncate:\s*Enum\.TextTruncate\.AtEnd/.test(caption)) throw new Error("caption must truncate");
if (!/AutomaticSize:\s*Enum\.AutomaticSize\.X/.test(caption)) throw new Error("caption height follows shell");
if (!/ClipsDescendants:\s*true/.test(styles)) throw new Error("labeled shell must clip");

const { dividerFit, dividerLabel } = await import("../src/ui/packages/divider/components/dividerLabel.ts");
if (dividerLabel(undefined) !== undefined) throw new Error("missing label");
if (dividerLabel("") !== undefined) throw new Error("empty label");
if (dividerLabel("Or") !== "Or") throw new Error("label");
if (dividerFit(400, 0) !== 0) throw new Error("unmeasured divider");
if (dividerFit(40, 300) !== 0) throw new Error("short divider");
if (dividerFit(400, 320) !== 320) throw new Error("long divider");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["horizontal", "vertical", "label"]) {
	if (!stateMatrix.some((row) => row.component === "Divider" && row.name.includes(name))) {
		throw new Error(`Divider missing ${name}`);
	}
}

console.log("divider ok");
