export type StepState = "complete" | "active" | "pending";

export function stepState(index: number, activeStep: number): StepState {
	if (index < activeStep) return "complete";
	if (index === activeStep) return "active";
	return "pending";
}
