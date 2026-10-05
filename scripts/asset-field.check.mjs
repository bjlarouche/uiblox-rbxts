Array.prototype.size = function size() { return this.length; };
String.prototype.size = function size() { return this.length; };
String.prototype.sub = function sub(i, j) { return this.slice(i - 1, j); };

const { assetPreviewUri } = await import("../src/ui/packages/assetField/components/assetPreviewUri.ts");
if (assetPreviewUri("") !== undefined) throw new Error("empty");
if (assetPreviewUri("123") !== "rbxassetid://123") throw new Error("id");
if (assetPreviewUri("rbxassetid://9") !== "rbxassetid://9") throw new Error("uri");
if (assetPreviewUri("nope") !== undefined) throw new Error("bad");

const { stateMatrix } = await import("../src/ui/packages/stateMatrix.ts");
for (const name of ["default", "disabled", "empty"]) {
	if (stateMatrix.filter((row) => row.component === "AssetField" && row.name.includes(name)).length !== 2) {
		throw new Error(`AssetField missing ${name}`);
	}
}

console.log("asset field ok");
