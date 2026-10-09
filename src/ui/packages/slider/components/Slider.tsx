import React, { useRef, useState } from "@rbxts/react";
import { TextService } from "@rbxts/services";
import { controlFade, controlMetrics, ControlSize, cx, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import { commitNumber } from "ui/packages/numberInput/components/numberValue";
import useSliderStyles, { SliderColor } from "./Slider.styles";
import { sliderLabel, sliderSlot } from "./sliderLabel";
import { sliderMarkValues } from "./sliderMarks";
import { isSliderDrag, isSliderMove, nudgeDelta, nudgeValue } from "./sliderNudge";

export interface SliderProps {
	value: number;
	onChange: (value: number) => void;
	onCommit?: (value: number) => void;
	min: number;
	max: number;
	step?: number;
	disabled?: boolean;
	size?: ControlSize;
	marks?: boolean | ReadonlyArray<number>;
	format?: (value: number) => string;
	color?: SliderColor;
}

function Slider(props: CustomizedProps<Frame, SliderProps>) {
	const { value, onChange, onCommit, min, max, step, disabled, size, marks, format, color = "primary", className, sx, id, ref } = props;
	const labelText = sliderLabel(format, value);
	const { theme } = useTheme();
	const metrics = controlMetrics(theme.density, size);
	const caption = theme.typography.variants.caption;
	const font = theme.typography.fontFamilies[caption.family] ?? Enum.Font.SourceSans;
	const slot =
		labelText === undefined
			? 0
			: sliderSlot(TextService.GetTextSize(labelText, caption.size, font, new Vector2(10000, 100)).X, 52, 4);
	const { root, track, fill, knob, corner, stroke, mark, label } = useSliderStyles({ size, color, labeled: labelText !== undefined });
	const active = canActivate(disabled);
	const [focused, setFocused] = useState(false);
	const [hovering, setHovering] = useState(false);
	const [pressed, setPressed] = useState(false);
	const dragging = useRef(false);
	const latest = useRef(value);
	const ratio = max > min ? (math.clamp(value, min, max) - min) / (max - min) : 0;
	const faded = disabled === true;
	const showFocus = focused && active;
	const markValues = sliderMarkValues(min, max, step, marks);
	const span = max - min;

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
		<SxHost
			tag="frame"
			key={id || "Slider"}
			hostRef={ref}
			base={root}
			className={className}
			sx={sx}
			state={{ disabled, hover: hovering, pressed, focused }}
			Active={active}
			Selectable={active}
			Event={{
				InputBegan: (rbx: Frame, input: InputObject) => {
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
				InputChanged: (rbx: Frame, input: InputObject) => {
					if (dragging.current && isSliderMove(input.UserInputType.Name)) {
						update(rbx, input.Position.X);
					}
				},
				InputEnded: (_rbx: Frame, input: InputObject) => {
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
				{...cx<Frame>(
					track,
					{
						BackgroundTransparency: faded ? controlFade : hovering && active ? 0.2 : 0.35,
					},
					labelText !== undefined && { Size: new UDim2(1, -(slot + 4), 0, metrics.sliderTrack) },
				)}
			>
				<uicorner {...corner} />
				<>
					{markValues.map((markValue, index) => {
						const markRatio = span > 0 ? (markValue - min) / span : 0;
						return (
							<frame
								key={`Mark-${index}`}
								{...mark}
								Position={UDim2.fromScale(markRatio, 0.5)}
								BackgroundTransparency={faded ? controlFade : 0.35}
							/>
						);
					})}
				</>
				<frame
					key="Fill"
					{...cx<Frame>(fill, { BackgroundTransparency: faded ? controlFade : pressed ? 0.1 : 0 })}
					Size={UDim2.fromScale(ratio, 1)}
				>
					<uicorner {...corner} />
				</frame>
				<frame
					key="Knob"
					{...cx<Frame>(knob, { BackgroundTransparency: faded ? controlFade : 0 })}
					Position={UDim2.fromScale(ratio, 0.5)}
				>
					<uicorner {...corner} />
					{showFocus && <uistroke {...stroke} />}
				</frame>
			</frame>
			{labelText !== undefined ? (
				<textlabel key="Value" {...label} Size={new UDim2(0, slot, 1, 0)} Text={labelText} TextTransparency={faded ? controlFade : 0} />
			) : undefined}
		</SxHost>
	);
}

export default Slider;
