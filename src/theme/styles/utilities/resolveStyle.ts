export type StyleSelectorKey =
	| "_hover"
	| "_pressed"
	| "_focus"
	| "_disabled"
	| "_selected"
	| "_checked"
	| "_first"
	| "_last";

export interface StyleState {
	hover?: boolean;
	pressed?: boolean;
	focused?: boolean;
	disabled?: boolean;
	selected?: boolean;
	checked?: boolean;
	first?: boolean;
	last?: boolean;
}

export type StyleWithSelectors<T extends object = object> = T & {
	_hover?: Partial<T>;
	_pressed?: Partial<T>;
	_focus?: Partial<T>;
	_disabled?: Partial<T>;
	_selected?: Partial<T>;
	_checked?: Partial<T>;
	_first?: Partial<T>;
	_last?: Partial<T>;
};

export interface InteractionSlots<T extends object = object> {
	hover?: T;
	pressed?: T;
	focused?: T;
	disabled?: T;
}

export type InteractionState = Pick<StyleState, "hover" | "pressed" | "focused" | "disabled">;

/** Order matters: later keys win. Structural first, then interaction; `_disabled` last. */
const SELECTORS: Array<[StyleSelectorKey, keyof StyleState]> = [
	["_first", "first"],
	["_last", "last"],
	["_selected", "selected"],
	["_checked", "checked"],
	["_hover", "hover"],
	["_pressed", "pressed"],
	["_focus", "focused"],
	["_disabled", "disabled"],
];

const SELECTOR_FLAGS: { [key: string]: true } = {
	_hover: true,
	_pressed: true,
	_focus: true,
	_selected: true,
	_checked: true,
	_first: true,
	_last: true,
	_disabled: true,
};

/** Peels `_hover` / `_pressed` / `_focus` / … and merges active ones onto the Instance props. */
export function resolveStyle<T extends object>(style: StyleWithSelectors<T>, state: StyleState = {}): T {
	const base = {} as { [key: string]: unknown };
	const patches = {} as { [key: string]: object };

	for (const [key, value] of pairs(style as object)) {
		const name = key as string;
		if (SELECTOR_FLAGS[name] === true) {
			patches[name] = value as object;
		} else {
			base[name] = value;
		}
	}

	let painted = base as unknown as T;
	for (const [selector, flag] of SELECTORS) {
		const patch = patches[selector];
		if (state[flag] === true && patch !== undefined) {
			painted = { ...painted, ...(patch as Partial<T>) } as T;
		}
	}
	return painted;
}

/** Prefer `resolveStyle` with `_hover` keys. Kept for existing call sites. */
export function interactionStyle<T extends object>(base: T, slots: InteractionSlots<T>, state: InteractionState): T {
	return resolveStyle(
		{
			...base,
			_hover: slots.hover,
			_pressed: slots.pressed,
			_focus: slots.focused,
			_disabled: slots.disabled,
		} as StyleWithSelectors<T>,
		state,
	);
}
