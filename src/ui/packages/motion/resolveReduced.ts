export function resolveReduced(override?: boolean, themeReduced?: boolean) {
	if (override !== undefined) return override;
	return themeReduced === true;
}
