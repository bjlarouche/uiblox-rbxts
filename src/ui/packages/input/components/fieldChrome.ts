/** Shared single-line field size. Height is the control metric. Inset is one padding step. */
export function fieldChrome(controlHeight: number, padUnit: number) {
	return {
		height: controlHeight,
		padX: padUnit,
	};
}
