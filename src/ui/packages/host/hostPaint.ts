import { resolveSx, ResolvedSx, SxInput } from "../../../theme/styles/utilities/resolveSx";
import { resolveStyle, StyleState } from "../../../theme/styles/utilities/resolveStyle";

export interface HostPaint {
	props: { [key: string]: unknown };
	padding?: ResolvedSx["padding"];
	corner?: ResolvedSx["corner"];
	gradient?: ResolvedSx["gradient"];
	gap?: number;
}

export function paintHostStyle(
	theme: Parameters<typeof resolveSx>[0],
	base: object | undefined,
	className: object | undefined,
	sx: SxInput | undefined,
	width: number | undefined,
	state: StyleState | undefined,
): HostPaint {
	const resolved = resolveSx(theme, sx, width);
	const merged = {
		...(base ?? {}),
		...(className ?? {}),
		...resolved.root,
	};
	return {
		props: resolveStyle(merged, state ?? {}) as { [key: string]: unknown },
		padding: resolved.padding,
		corner: resolved.corner,
		gradient: resolved.gradient,
		gap: resolved.gap,
	};
}
