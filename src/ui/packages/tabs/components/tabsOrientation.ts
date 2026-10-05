export type TabsOrientation = "horizontal" | "vertical";

export function tabsIsVertical(orientation?: TabsOrientation) {
	return orientation === "vertical";
}
