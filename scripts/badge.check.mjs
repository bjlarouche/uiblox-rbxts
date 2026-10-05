import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

globalThis.tostring = String;

const { badgeText } = await import("../src/ui/packages/badge/components/badgeValue.ts");
if (badgeText(3, 99) !== "3") throw new Error("count");
if (badgeText(100, 99) !== "99+") throw new Error("max");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["count", "max", "invisible", "dot"]) {
	if (stateMatrix.filter((row) => row.component === "Badge" && row.name.includes(name)).length !== 2) {
		throw new Error(`Badge missing ${name}`);
	}
}

const styles = readFileSync(
	join(dirname(fileURLToPath(import.meta.url)), "../src/ui/packages/badge/components/Badge.styles.ts"),
	"utf8",
);
if (!styles.includes("AutomaticSize: Enum.AutomaticSize.X") && !styles.includes('Enum.AutomaticSize.X')) {
	throw new Error("badge autosize X");
}
if (!styles.includes("fromOffset(diameter, diameter)")) throw new Error("badge equal size");
if (!styles.includes("CornerRadius: new UDim(0.5, 0)")) throw new Error("badge half corner");
if (!styles.includes('"dot"')) throw new Error("badge dot variant");

console.log("badge ok");
