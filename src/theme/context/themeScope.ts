export interface ThemeScope<T> {
	theme: T;
	setTheme: (theme: T) => void;
}

export function readScopedTheme<T>(provided: ThemeScope<T> | undefined, fallback: ThemeScope<T>): ThemeScope<T> {
	return provided ?? fallback;
}
