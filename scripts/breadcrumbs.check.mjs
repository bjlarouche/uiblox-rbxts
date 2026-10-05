const { breadcrumbCurrent } = await import("../src/ui/packages/breadcrumbs/components/breadcrumbItems.ts");
if (breadcrumbCurrent(0, 0) || breadcrumbCurrent(0, 2) || !breadcrumbCurrent(1, 2)) {
	throw new Error("current item");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["single", "trail", "custom-separator"]) {
	if (stateMatrix.filter((row) => row.component === "Breadcrumbs" && row.name.includes(name)).length !== 2) {
		throw new Error(`Breadcrumbs missing ${name}`);
	}
}

console.log("breadcrumbs ok");
