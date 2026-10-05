export function enumOptions(items: EnumItem[]) {
	return items.map((item) => ({ label: item.Name, value: item }));
}

export function enumItemByName(items: EnumItem[], name: string) {
	for (const item of items) {
		if (item.Name === name) return item;
	}
	return undefined;
}
