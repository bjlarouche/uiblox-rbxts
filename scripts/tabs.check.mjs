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
