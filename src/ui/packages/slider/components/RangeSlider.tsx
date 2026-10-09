import React, { useRef, useState } from "@rbxts/react";
import { controlFade, ControlSize, CustomizedProps, cx } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import { commitNumber } from "ui/packages/numberInput/components/numberValue";
import { SliderColor } from "./Slider.styles";
import { isSliderDrag, isSliderMove, nudgeDelta, nudgeValue } from "./sliderNudge";
import useRangeSliderStyles from "./RangeSlider.styles";
import { orderRange, RangeThumb, rangeMove, rangeRatios, rangeThumb, RangeValue } from "./rangeValue";

export interface RangeSliderProps {
	value: RangeValue;
	onChange: (value: RangeValue) => void;
	onCommit?: (value: RangeValue) => void;
	min: number;
	max: number;
	step?: number;
	disabled?: boolean;
	size?: ControlSize;
	color?: SliderColor;
}

function RangeSlider(props: CustomizedProps<Frame, RangeSliderProps>) {
	const { value, onChange, onCommit, min, max, step, disabled, size, color = "primary", className, sx, id, ref } = props;
	const styles = useRangeSliderStyles({ size, color });
	const ordered = orderRange(value.start, value.finish);
	const ratios = rangeRatios(ordered.start, ordered.finish, min, max);
	const active = canActivate(disabled);
	const [focused, setFocused] = useState(false);
	const [pressed, setPressed] = useState(false);
	const dragging = useRef(false);
	const thumb = useRef<RangeThumb>("low");
	const latest = useRef(ordered);
	latest.current = ordered;
	const faded = disabled === true;
	const showFocus = focused && active;

	const pointerValue = (rbx: Frame, x: number) => {
		const width = rbx.AbsoluteSize.X;
		if (width <= 0) return undefined;
		return commitNumber(min + ((x - rbx.AbsolutePosition.X) / width) * (max - min), min, max, step);
	};

	const publish = (landed: { thumb: RangeThumb; start: number; finish: number }, commit: boolean) => {
		thumb.current = landed.thumb;
		if (landed.start === latest.current.start && landed.finish === latest.current.finish) return;
		latest.current = { start: landed.start, finish: landed.finish };
		onChange(latest.current);
		if (commit && onCommit) onCommit(latest.current);
	};

	const update = (rbx: Frame, x: number) => {
		const landed = pointerValue(rbx, x);
		if (landed === undefined) return;
		publish(rangeMove(thumb.current, landed, latest.current.start, latest.current.finish), false);
	};

	const finish = () => {
		if (!dragging.current) return;
		dragging.current = false;
		setPressed(false);
		if (onCommit) onCommit(latest.current);
	};

	const nudge = (direction: number) => {
		if (!active) return;
		const current = thumb.current === "low" ? latest.current.start : latest.current.finish;
		const nudged = nudgeValue(current, min, max, step, direction);
		if (nudged === undefined) return;
		publish(rangeMove(thumb.current, nudged, latest.current.start, latest.current.finish), true);
	};

	const knobLook = (ratio: number, which: RangeThumb) =>
		cx<Frame>(styles.knob, {
			Position: UDim2.fromScale(ratio, 0.5),
			BackgroundTransparency: faded ? controlFade : 0,
			ZIndex: which === thumb.current ? 3 : 2,
		});

	return (
		<SxHost
			tag="frame"
			key={id || "RangeSlider"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, pressed, focused }}
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
					const landed = pointerValue(rbx, input.Position.X);
					if (landed !== undefined) thumb.current = rangeThumb(landed, latest.current.start, latest.current.finish);
					dragging.current = true;
					setPressed(true);
					update(rbx, input.Position.X);
				},
				InputChanged: (rbx: Frame, input: InputObject) => {
					if (dragging.current && isSliderMove(input.UserInputType.Name)) update(rbx, input.Position.X);
				},
				InputEnded: (_rbx: Frame, input: InputObject) => {
					if (isSliderDrag(input.UserInputType.Name)) finish();
				},
				MouseLeave: () => finish(),
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		>
			<frame key="Track" {...styles.track} BackgroundTransparency={faded ? controlFade : 0.35}>
				<uicorner {...styles.corner} />
				<frame
					key="Fill"
					{...cx<Frame>(styles.fill, {
						Position: UDim2.fromScale(ratios.low, 0),
						Size: UDim2.fromScale(ratios.high - ratios.low, 1),
						BackgroundTransparency: faded ? controlFade : pressed ? 0.1 : 0,
					})}
				>
					<uicorner {...styles.corner} />
				</frame>
				<frame key="Low" {...knobLook(ratios.low, "low")}>
					<uicorner {...styles.corner} />
					{showFocus && thumb.current === "low" && <uistroke {...styles.stroke} />}
				</frame>
				<frame key="High" {...knobLook(ratios.high, "high")}>
					<uicorner {...styles.corner} />
					{showFocus && thumb.current === "high" && <uistroke {...styles.stroke} />}
				</frame>
			</frame>
		</SxHost>
	);
}

export default RangeSlider;
