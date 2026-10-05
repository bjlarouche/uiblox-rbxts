export interface ComponentSpec {
	defaultProps?: { [key: string]: unknown };
	styleOverrides?: { [slot: string]: object };
}

export function propsWithDefaults(
	defaults: { [key: string]: unknown } | undefined,
	props: { [key: string]: unknown } | undefined,
) {
	if (defaults === undefined) return props ?? {};
	const merged: { [key: string]: unknown } = {};
	for (const [key, value] of pairs(defaults)) merged[key as string] = value;
	if (props !== undefined) {
		for (const [key, value] of pairs(props)) {
			if (value !== undefined) merged[key as string] = value;
		}
	}
	return merged;
}

export function slotsWithOverrides<Slots extends { [slot: string]: object }>(
	slots: Slots,
	overrides: { [slot: string]: object } | undefined,
): Slots {
	if (overrides === undefined) return slots;
	const painted = { ...slots } as { [slot: string]: object };
	for (const [slot, style] of pairs(overrides)) {
		const name = slot as string;
		const current = painted[name];
		painted[name] = current === undefined ? style : { ...current, ...style };
	}
	return painted as Slots;
}
