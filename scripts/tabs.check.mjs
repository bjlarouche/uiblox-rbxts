const { tabScroll } = await import("../src/ui/packages/tabs/components/tabScroll.ts");
if (tabScroll(0, 0, 40, 100) !== 0) throw new Error("visible tab");
if (tabScroll(0, 200, 40, 100) !== 140) throw new Error("tab past the view");
if (tabScroll(200, 10, 40, 100) !== 10) throw new Error("tab before the view");
if (tabScroll(50, 60, 20, 100) !== 50) throw new Error("tab inside the view");
if (tabScroll(0, 0, 40, 0) !== 0) throw new Error("empty view");

const { tabsIsVertical } = await import("../src/ui/packages/tabs/components/tabsOrientation.ts");
if (tabsIsVertical("vertical") !== true || tabsIsVertical() !== false || tabsIsVertical("horizontal") !== false) {
	throw new Error("orientation");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "vertical", "disabled", "centered"]) {
	if (!stateMatrix.some((row) => row.component === "Tabs" && row.name.includes(name))) {
		throw new Error(`Tabs missing ${name}`);
	}
}

console.log("tabs ok");
