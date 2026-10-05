export interface FontFamily {
	label: string;
	family: string;
}

export function familyLabel(family: string) {
	let start = 1;
	for (let index = 1; index <= family.size(); index++) {
		if (family.sub(index, index) === "/") start = index + 1;
	}
	let name = family.sub(start);
	if (name.size() >= 5 && name.sub(name.size() - 4) === ".json") name = name.sub(1, name.size() - 5);
	return name.size() > 0 ? name : family;
}

export function uniqueFamilies(families: string[]) {
	const listed = new Array<FontFamily>();
	for (const family of families) {
		if (family.size() === 0) continue;
		if (listed.find((item) => item.family === family) !== undefined) continue;
		const item = { label: familyLabel(family), family };
		let at = listed.size();
		for (let index = 0; index < listed.size(); index++) {
			if (item.label.lower() < listed[index].label.lower()) {
				at = index;
				break;
			}
		}
		listed.insert(at, item);
	}
	return listed;
}

export function enumFamilies(items: { Family: string }[]) {
	const families = new Array<string>();
	for (const item of items) families.push(item.Family);
	return uniqueFamilies(families);
}

export function writeFont(family: string, weight: Enum.FontWeight, style: Enum.FontStyle) {
	return new Font(family, weight, style);
}
