import { readFileSync } from "node:fs";
import { join } from "node:path";

const bar = readFileSync(join(process.cwd(), "src/ui/packages/appBar/components/AppBar.styles.ts"), "utf8");
if (bar.includes("spacing.calc(8)")) throw new Error("AppBar title still uses a fixed action inset");
if (!bar.includes("UIFlexAlignment.SpaceBetween")) throw new Error("AppBar actions should sit opposite the title");

const { appBarSubtitle } = await import("../src/ui/packages/appBar/components/appBarSubtitle.ts");
if (appBarSubtitle() !== undefined || appBarSubtitle("") !== undefined) throw new Error("empty subtitle");
if (appBarSubtitle("Night watch") !== "Night watch") throw new Error("subtitle");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "flat", "raised", "primary"]) {
	if (!stateMatrix.some((row) => row.component === "AppBar" && row.name.includes(name))) {
		throw new Error(`AppBar missing ${name}`);
	}
}

console.log("appbar ok");
