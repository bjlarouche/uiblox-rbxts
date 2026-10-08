export type StepState = "complete" | "active" | "pending" | "error";

export function stepState(index: number, activeStep: number, errorStep?: number): StepState {
	if (errorStep !== undefined && index === errorStep) return "error";
	if (index < activeStep) return "complete";
	if (index === activeStep) return "active";
	return "pending";
}

/** Completed and current steps can be pressed. A later step cannot. */
export function stepPress(index: number, activeStep: number) {
	if (index < 0 || index > activeStep) return undefined;
	return index;
}
