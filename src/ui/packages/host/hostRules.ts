const SKIP: { [key: string]: true } = {
	tag: true,
	base: true,
	className: true,
	sx: true,
	state: true,
	hostRef: true,
	children: true,
};

export function sxUsesBreakpoints(sx: object | undefined): boolean {
	if (sx === undefined) return false;
	for (const [, value] of pairs(sx)) {
		if (typeOf(value) !== "table") continue;
		const record = value as { phone?: unknown; tablet?: unknown; desktop?: unknown };
		if (record.phone !== undefined || record.tablet !== undefined || record.desktop !== undefined) return true;
	}
	return false;
}

export function elementProps(element: unknown): { [key: string]: unknown } {
	if (typeOf(element) !== "table") return {};
	const props = (element as { props?: unknown }).props;
	if (typeOf(props) !== "table") return {};
	return props as { [key: string]: unknown };
}

export function elementType(element: unknown): unknown {
	if (typeOf(element) !== "table") return undefined;
	return (element as { type?: unknown }).type;
}

export function hostKind(typeName: unknown): string | undefined {
	if (!typeIs(typeName, "string")) return undefined;
	return string.lower(typeName as string);
}

/** Explicit layout padding wins. Otherwise sx `gap` fills the empty field. */
export function layoutGapPatch(
	kind: string,
	props: { [key: string]: unknown },
	gap: number | undefined,
): { [key: string]: unknown } | undefined {
	if (gap === undefined) return undefined;
	if (kind === "uilistlayout") {
		if (props.Padding !== undefined) return undefined;
		return { Padding: new UDim(0, gap) };
	}
	if (kind === "uigridlayout") {
		if (props.CellPadding !== undefined) return undefined;
		return { CellPadding: new UDim2(0, gap, 0, gap) };
	}
	return undefined;
}

export function hostRest(props: object): { [key: string]: unknown } {
	const rest: { [key: string]: unknown } = {};
	for (const [key, value] of pairs(props)) {
		const name = key as string;
		if (SKIP[name] === true) continue;
		rest[name] = value;
	}
	return rest;
}
