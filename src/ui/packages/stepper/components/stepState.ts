export type StepState = "complete" | "active" | "pending" | "error";

export function stepState(index: number, activeStep: number, errorStep?: number): StepState {
	if (errorStep !== undefined && index === errorStep) return "error";
	if (index < activeStep) return "complete";
	if (index === activeStep) return "active";
	return "pending";
}
