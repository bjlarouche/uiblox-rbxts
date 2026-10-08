import React from "@rbxts/react";
import { cx, CustomizedProps, WriteableStyle } from "theme";
import { stepPress, stepState } from "./stepState";
import { SxHost } from "ui/packages/host";
import useStepperStyles from "./Stepper.styles";

export interface StepperProps {
	steps: string[];
	activeStep: number;
	orientation?: "horizontal" | "vertical";
	errorStep?: number;
	onStep?: (index: number) => void;
}

function Stepper(props: CustomizedProps<Frame, StepperProps>) {
	const { steps, activeStep, orientation = "horizontal", errorStep, onStep, className, sx, id, ref } = props;
	const styles = useStepperStyles({ orientation });
	return (
		<SxHost tag="frame" key={id || "Stepper"} hostRef={ref} base={styles.root} className={className} sx={sx}>
			<uilistlayout {...styles.list} />
			<>
			{steps.map((title, index) => {
				const state = stepState(index, activeStep, errorStep);
				const caption = `${index + 1}. ${title}`;
				const look = cx<TextLabel>(
					styles.step,
					state === "active" && styles.active,
					state === "complete" && styles.complete,
					state === "error" && styles.error,
				);
				const press = onStep !== undefined ? stepPress(index, activeStep) : undefined;
				if (onStep === undefined) {
					return <textlabel key={`${title}-${index}`} {...look} Text={caption} LayoutOrder={index} />;
				}
				return (
					<textbutton
						key={`${title}-${index}`}
						{...(look as WriteableStyle<TextButton>)}
						Text={caption}
						LayoutOrder={index}
						AutoButtonColor={false}
						Active={press !== undefined}
						Selectable={press !== undefined}
						Event={{
							Activated: () => {
								if (press !== undefined) onStep(press);
							},
						}}
					/>
				);
			})}
			</>
		</SxHost>
	);
}

export default Stepper;
