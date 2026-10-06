import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { stepState } from "./stepState";
import { SxHost } from "ui/packages/host";
import useStepperStyles from "./Stepper.styles";

export interface StepperProps {
	steps: string[];
	activeStep: number;
	orientation?: "horizontal" | "vertical";
}

function Stepper(props: CustomizedProps<Frame, StepperProps>) {
	const { steps, activeStep, orientation = "horizontal", className, sx, id, ref } = props;
	const styles = useStepperStyles({ orientation });
	return (
		<SxHost tag="frame" key={id || "Stepper"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.list} />
			<>
			{steps.map((label, index) => {
				const state = stepState(index, activeStep);
				return (
					<textlabel
						key={`${label}-${index}`}
						{...cx<TextLabel>(
							styles.step,
							state === "active" && styles.active,
							state === "complete" && styles.complete,
						)}
						Text={`${index + 1}. ${label}`}
						LayoutOrder={index}
					/>
				);
			})}
			</>
		</SxHost>
	);
}

export default Stepper;
