export function avatarInitials(name: string) {
	let result = "";
	for (const word of name.split(" ")) {
		if (word.size() === 0) continue;
		result += word.sub(1, 1).upper();
		if (result.size() === 2) break;
	}
	return result;
}
