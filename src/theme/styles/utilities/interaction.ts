export interface InteractionSlots<T extends object = object> {
	hover?: T;
	pressed?: T;
	focused?: T;
	disabled?: T;
}

export interface InteractionState {
	hover?: boolean;
	pressed?: boolean;
	focused?: boolean;
	disabled?: boolean;
}

export function interactionStyle<T extends object>(base: T, slots: InteractionSlots<T>, state: InteractionState): T {
	let painted = base;
	if (state.hover === true && slots.hover !== undefined) painted = { ...painted, ...slots.hover };
	if (state.pressed === true && slots.pressed !== undefined) painted = { ...painted, ...slots.pressed };
	if (state.focused === true && slots.focused !== undefined) painted = { ...painted, ...slots.focused };
	if (state.disabled === true && slots.disabled !== undefined) painted = { ...painted, ...slots.disabled };
	return painted;
}
