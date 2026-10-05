export function assetPreviewUri(value: string) {
	if (value.size() === 0) return undefined;
	if (value.sub(1, 13) === "rbxassetid://") return value;
	if (value.sub(1, 11) === "rbxasset://") return value;
	for (let i = 1; i <= value.size(); i++) {
		const c = value.sub(i, i);
		if (c < "0" || c > "9") return undefined;
	}
	return `rbxassetid://${value}`;
}
