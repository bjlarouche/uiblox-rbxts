export type ContainerMaxWidth = "xs" | "sm" | "md" | "lg" | "xl" | false;

const WIDTHS: Record<Exclude<ContainerMaxWidth, false>, number> = {
	xs: 444,
	sm: 600,
	md: 900,
	lg: 1200,
	xl: 1536,
};

export function containerMaxPx(maxWidth?: ContainerMaxWidth): number | undefined {
	if (maxWidth === false) return undefined;
	return WIDTHS[maxWidth ?? "lg"];
}
