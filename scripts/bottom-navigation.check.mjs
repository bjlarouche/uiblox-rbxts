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
