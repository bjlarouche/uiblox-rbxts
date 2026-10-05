let cached: BrickColor[] | undefined;

export function brickColorCatalog() {
	if (cached !== undefined) return cached;
	const colors = new Array<BrickColor>();
	for (let i = 1; i <= 127; i++) {
		const color = BrickColor.palette(i);
		let seen = false;
		for (const existing of colors) {
			if (existing.Number === color.Number) {
				seen = true;
				break;
			}
		}
		if (!seen) colors.push(color);
	}
	cached = colors;
	return colors;
}
