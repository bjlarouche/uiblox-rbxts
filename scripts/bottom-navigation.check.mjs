import { readFileSync } from "node:fs";

const nav = readFileSync("src/ui/packages/bottomNavigation/components/BottomNavigation.styles.ts", "utf8");
if (!nav.includes("TextTruncate")) throw new Error("nav labels should truncate");
const selected = nav.slice(nav.indexOf("selected:"));
if (!selected.includes("text.primary")) throw new Error("current nav item should use the primary text color");
if (!nav.includes("AnchorPoint: new Vector2(0.5, 0)")) throw new Error("nav mark should sit inside the item");

const { navBadge } = await import("../src/ui/packages/bottomNavigation/components/navBadge.ts");
if (navBadge() !== undefined || navBadge(0) !== undefined) throw new Error("empty count");
if (navBadge(3) !== "3" || navBadge(120) !== "99+") throw new Error("count mark");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "selected", "disabled", "icons"]) {
	if (!stateMatrix.some((row) => row.component === "BottomNavigation" && row.name.includes(name))) {
		throw new Error(`BottomNavigation missing ${name}`);
	}
}

console.log("bottom-navigation ok");
