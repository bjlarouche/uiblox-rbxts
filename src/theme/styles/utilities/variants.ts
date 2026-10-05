export interface CompoundVariant {
	when: { [prop: string]: unknown };
	styles: { [slot: string]: object };
}

function paint(slots: { [slot: string]: object }, patch: { [slot: string]: object } | undefined) {
	if (patch === undefined) return;
	for (const [slot, style] of pairs(patch)) {
		const name = slot as string;
		const current = slots[name];
		slots[name] = current === undefined ? style : { ...current, ...style };
	}
}

export function applyVariants<Slots extends { [slot: string]: object }>(
	base: Slots,
	props: { [prop: string]: unknown },
	variants: { [prop: string]: { [value: string]: { [slot: string]: object } } },
	compound: CompoundVariant[] = [],
): Slots {
	const slots = { ...base } as { [slot: string]: object };
	for (const [prop, options] of pairs(variants)) {
		const value = props[prop as string];
		if (value === undefined) continue;
		paint(slots, options[tostring(value)]);
	}
	for (const rule of compound) {
		let matched = true;
		for (const [prop, expected] of pairs(rule.when)) {
			if (props[prop as string] !== expected) {
				matched = false;
				break;
			}
		}
		if (matched) paint(slots, rule.styles);
	}
	return slots as Slots;
}
