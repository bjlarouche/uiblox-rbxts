import { readFileSync } from "node:fs";

const tabs = readFileSync("src/ui/packages/tabs/components/Tabs.tsx", "utf8");
if (tabs.includes("task.defer(")) throw new Error("tabs scroll uses defer");
if (tabs.includes("WaitForChild")) throw new Error("tabs waits in render");
const effect = tabs.slice(tabs.indexOf("useEffect"), tabs.indexOf("const onKey"));
const deps = effect.match(/\},\s*\[([^\]]*)\]/);
if (!deps) throw new Error("tabs effect deps");
if (/\boptions\b(?!\.size)/.test(deps[1])) throw new Error("tabs scroll effect depends on options");

const { tabScroll } = await import("../src/ui/packages/tabs/components/tabScroll.ts");
if (tabScroll(0, 0, 40, 100) !== 0) throw new Error("visible tab");
if (tabScroll(0, 200, 40, 100) !== 140) throw new Error("tab past the view");
if (tabScroll(200, 10, 40, 100) !== 10) throw new Error("tab before the view");
if (tabScroll(50, 60, 20, 100) !== 50) throw new Error("tab inside the view");
if (tabScroll(0, 0, 40, 0) !== 0) throw new Error("empty view");

const { tabIndicatorBox } = await import("../src/ui/packages/tabs/components/tabIndicator.ts");
const horizontal = tabIndicatorBox(false, 2, 8);
if (horizontal.widthScale !== 1 || horizontal.widthOffset !== 0 || horizontal.heightOffset !== 2) {
	throw new Error("horizontal indicator spills");
}
const verticalMark = tabIndicatorBox(true, 2, 8);
if (verticalMark.widthOffset !== 2 || verticalMark.heightScale !== 1 || verticalMark.heightOffset !== -8) {
	throw new Error("vertical indicator");
}
const styles = readFileSync("src/ui/packages/tabs/components/Tabs.styles.ts", "utf8");
if (styles.includes("padding.calc(4)")) throw new Error("indicator width offset");

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
