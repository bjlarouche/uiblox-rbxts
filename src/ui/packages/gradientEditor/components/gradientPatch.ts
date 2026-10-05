export function patchRotation(rotation: number, enabled: boolean, amount: number) {
	return { rotation: amount, enabled };
}

export function patchEnabled(rotation: number, enabled: boolean, on: boolean) {
	return { rotation, enabled: on };
}
