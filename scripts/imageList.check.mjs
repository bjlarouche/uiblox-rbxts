globalThis.math = {
	floor: (n) => Math.floor(n),
};
String.prototype.size = function size() {
	return this.length;
};

const { imageListTitle } = await import("../src/ui/packages/imageList/components/imageListLayout.ts");
if (imageListTitle(undefined) !== undefined) throw new Error("missing title");
if (imageListTitle("") !== undefined) throw new Error("empty title");
if (imageListTitle("Cove") !== "Cove") throw new Error("title");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
if (stateMatrix.filter((row) => row.component === "ImageList" && row.name.includes("titled")).length !== 2) {
	throw new Error("ImageList missing titled");
}

console.log("image list ok");
