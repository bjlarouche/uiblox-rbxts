const KEYED: { [kind: string]: boolean } = {
	Color3: true,
	UDim: true,
	UDim2: true,
	Vector2: true,
	Vector3: true,
	EnumItem: true,
	CFrame: true,
	BrickColor: true,
};

export function styleDepsKey(props: object | undefined): string {
	if (props === undefined) return "";
	const parts: string[] = [];
	for (const [key, value] of pairs(props as Record<string, unknown>)) {
		if (value === undefined) continue;
		const kind = typeOf(value);
		const name = key as string;
		if (kind === "string" || kind === "number" || kind === "boolean") {
			parts.push(`${name}=${value}`);
		} else if (KEYED[kind]) {
			parts.push(`${name}=${kind}:${tostring(value)}`);
		} else {
			parts.push(`${name}=*`);
		}
	}
	parts.sort();
	let key = "";
	for (const part of parts) key = key === "" ? part : `${key}\0${part}`;
	return key;
}

export function createStyleCache<T extends defined>() {
	const byTheme = new Map<object, Map<string, T>>();
	return (theme: object, key: string, create: () => T): T => {
		let bucket = byTheme.get(theme);
		if (bucket === undefined) {
			bucket = new Map();
			byTheme.set(theme, bucket);
		}
		const hit = bucket.get(key);
		if (hit !== undefined) return hit;
		const value = create();
		bucket.set(key, value);
		return value;
	};
}
