globalThis.math = { floor: Math.floor, max: Math.max, huge: Infinity };

const { imageListAspect, imageListCell, imageListCols, imageListGap, imageListItemAspect, imageListItemSize, imageListSelected } = await import(
	"../src/ui/packages/imageList/components/imageListLayout.ts"
);
if (imageListCols() !== 3 || imageListCols(0) !== 3 || imageListCols(4) !== 4) throw new Error("cols");
if (imageListGap() !== 1 || imageListGap(-1) !== 1 || imageListGap(2) !== 2) throw new Error("gap");
if (imageListItemSize() !== 96 || imageListItemSize(0) !== 96 || imageListItemSize(120) !== 120) {
	throw new Error("itemSize");
}
if (imageListAspect() !== 1 || imageListAspect(0) !== 1 || imageListAspect(16 / 9) !== 16 / 9) throw new Error("aspect");
const wide = imageListCell(160, 4 / 3);
if (wide.width !== 160 || wide.height !== 120) throw new Error("cell");
if (imageListCell().width !== 96 || imageListCell().height !== 96) throw new Error("square cell");
const portrait = imageListCell(120, imageListItemAspect(3 / 4, 16 / 9));
const landscape = imageListCell(120, imageListItemAspect(3 / 2, 16 / 9));
const fallback = imageListCell(120, imageListItemAspect(undefined, 4 / 3));
if (portrait.height <= portrait.width || landscape.height >= landscape.width) throw new Error("mixed ratios");
if (portrait.width !== landscape.width) throw new Error("shared width");
if (fallback.width !== 120 || fallback.height !== 90) throw new Error("fallback aspect");
if (imageListItemAspect(0, 4 / 3) !== 4 / 3) throw new Error("bad item aspect");
if (!imageListSelected([0, 2], 2) || imageListSelected([0, 2], 1) || imageListSelected(undefined, 0)) {
	throw new Error("selected");
}

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "dense", "wide", "titled", "untitled"]) {
	if (!stateMatrix.some((row) => row.component === "ImageList" && row.name.includes(`ImageList-${name}-`))) {
		throw new Error(`ImageList missing ${name}`);
	}
}

console.log("image-list ok");
