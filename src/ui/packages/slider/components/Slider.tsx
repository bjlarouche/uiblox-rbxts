import React, { useRef, useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { commitNumber } from "ui/packages/numberInput/components/numberValue";
import useSliderStyles from "./Slider.styles";
import { isSliderDrag, isSliderMove, nudgeDelta, nudgeValue } from "./sliderNudge";

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
	const { root, track, fill, knob, corner, stroke } = useSliderStyles();
	const active = canActivate(disabled);
	const [focused, setFocused] = useState(false);
	const [hovering, setHovering] = useState(false);
	const [pressed, setPressed] = useState(false);
	const dragging = useRef(false);
	const latest = useRef(value);
	const ratio = max > min ? (math.clamp(value, min, max) - min) / (max - min) : 0;
	const faded = disabled === true;
	const showFocus = focused && active;

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
		setPressed(false);
		if (onCommit) onCommit(latest.current);
	};

	const nudge = (direction: number) => {
		if (!active) return;
		const nudged = nudgeValue(value, min, max, step, direction);
		if (nudged === undefined || nudged === value) return;
		latest.current = nudged;
		onChange(nudged);
		if (onCommit) onCommit(nudged);
	};

	return (
		<frame
			key={id || "Slider"}
			ref={ref}
			{...root}
			{...className}
			Active={active}
			Selectable={active}
			BackgroundTransparency={showFocus ? 0.85 : 1}
			Event={{
				InputBegan: (rbx, input) => {
					if (!active) return;
					const direction = nudgeDelta(input.KeyCode.Name);
					if (direction !== undefined) {
						nudge(direction);
						return;
					}
					if (!isSliderDrag(input.UserInputType.Name)) return;
					dragging.current = true;
					setPressed(true);
					latest.current = value;
					update(rbx, input.Position.X);
				},
				InputChanged: (rbx, input) => {
					if (dragging.current && isSliderMove(input.UserInputType.Name)) {
						update(rbx, input.Position.X);
					}
				},
				InputEnded: (_, input) => {
					if (isSliderDrag(input.UserInputType.Name)) finish();
				},
				MouseEnter: () => {
					if (active) setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
					finish();
				},
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		>
			<frame
				key="Track"
				{...cx<Frame>(track, {
					BackgroundTransparency: faded ? 0.55 : hovering && active ? 0.2 : 0.35,
				})}
			>
				<uicorner {...corner} />
				{showFocus && <uistroke {...stroke} />}
				<frame
					key="Fill"
					{...cx<Frame>(fill, { BackgroundTransparency: faded ? 0.55 : pressed ? 0.1 : 0 })}
					Size={UDim2.fromScale(ratio, 1)}
				>
					<uicorner {...corner} />
				</frame>
				<frame
					key="Knob"
					{...cx<Frame>(knob, { BackgroundTransparency: faded ? 0.45 : 0 })}
					Position={UDim2.fromScale(ratio, 0.5)}
				>
					<uicorner {...corner} />
					{showFocus && <uistroke {...stroke} Thickness={1} />}
				</frame>
			</frame>
		</frame>
	);
}

export default Slider;
