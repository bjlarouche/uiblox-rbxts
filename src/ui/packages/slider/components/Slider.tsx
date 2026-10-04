import React, { useRef } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { commitNumber } from "ui/packages/numberInput/components/numberValue";
import useSliderStyles from "./Slider.styles";

export interface SliderProps {
	value: number;
	onChange: (value: number) => void;
	onCommit?: (value: number) => void;
	min: number;
	max: number;
	step?: number;
	disabled?: boolean;
}

function Slider(props: CustomizedProps<Frame, SliderProps>) {
	const { value, onChange, onCommit, min, max, step, disabled, className, id, ref } = props;
	const { root, track, fill, knob, corner } = useSliderStyles();
	const active = canActivate(disabled);
	const dragging = useRef(false);
	const latest = useRef(value);
	const ratio = max > min ? (math.clamp(value, min, max) - min) / (max - min) : 0;

	const update = (rbx: Frame, x: number) => {
		const width = rbx.AbsoluteSize.X;
		if (width <= 0) return;
		const committed = commitNumber(min + ((x - rbx.AbsolutePosition.X) / width) * (max - min), min, max, step);
		if (committed === undefined || committed === latest.current) return;
		latest.current = committed;
		onChange(committed);
	};

	const finish = () => {
		if (!dragging.current) return;
		dragging.current = false;
		if (onCommit) onCommit(latest.current);
	};

	return (
		<frame
			key={id || "Slider"}
			ref={ref}
			{...root}
			{...className}
			Active={active}
			Event={{
				InputBegan: (rbx, input) => {
					if (!active || input.UserInputType !== Enum.UserInputType.MouseButton1) return;
					dragging.current = true;
					latest.current = value;
					update(rbx, input.Position.X);
				},
				InputChanged: (rbx, input) => {
					if (dragging.current && input.UserInputType === Enum.UserInputType.MouseMovement) {
						update(rbx, input.Position.X);
					}
				},
				InputEnded: (_, input) => {
					if (input.UserInputType === Enum.UserInputType.MouseButton1) finish();
				},
				MouseLeave: finish,
			}}
		>
			<frame key="Track" {...cx<Frame>(track, disabled === true && { BackgroundTransparency: 0.5 })}>
				<uicorner {...corner} />
				<frame key="Fill" {...fill} Size={UDim2.fromScale(ratio, 1)}>
					<uicorner {...corner} />
				</frame>
				<frame key="Knob" {...knob} Position={UDim2.fromScale(ratio, 0.5)}>
					<uicorner {...corner} />
				</frame>
			</frame>
		</frame>
	);
}

export default Slider;
