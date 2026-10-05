export function badgeText(count: number, max: number) {
	return count > max ? `${max}+` : tostring(count);
}
