globalThis.math = { floor: Math.floor, huge: Infinity };

const { imageListCols, imageListGap, imageListItemSize } = await import(
	"../src/ui/packages/imageList/components/imageListLayout.ts"
);
if (imageListCols() !== 3 || imageListCols(0) !== 3 || imageListCols(4) !== 4) throw new Error("cols");
if (imageListGap() !== 1 || imageListGap(-1) !== 1 || imageListGap(2) !== 2) throw new Error("gap");
if (imageListItemSize() !== 96 || imageListItemSize(0) !== 96 || imageListItemSize(120) !== 120) {
	throw new Error("itemSize");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "dense", "wide", "titled", "untitled"]) {
	if (!stateMatrix.some((row) => row.component === "ImageList" && row.name.includes(`ImageList-${name}-`))) {
		throw new Error(`ImageList missing ${name}`);
	}
}

console.log("image-list ok");
