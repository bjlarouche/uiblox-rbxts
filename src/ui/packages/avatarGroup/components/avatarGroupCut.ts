/** Faces drawn before a surplus badge. A max below 2, or a short list, shows every face. */
export function avatarGroupCut(count: number, max?: number) {
	if (max === undefined || max !== max || max < 2 || count <= max) return count;
	return max - 1;
}
