import React, { useEffect, useRef, useState } from "@rbxts/react";
import { TweenService } from "@rbxts/services";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useSwitchStyles from "./Switch.styles";
import {
	switchPointer,
	switchStrokeTransparency,
	switchThumbPlacement,
	switchThumbTransparency,
	switchTrackTransparency,
} from "./switchLook";

export interface SwitchProps {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	label?: string;
}

const THUMB_INSET = 3;
const THUMB_TWEEN = new TweenInfo(0.14, Enum.EasingStyle.Quad, Enum.EasingDirection.Out);

function Switch(props: CustomizedProps<TextButton, SwitchProps>) {
	const { value, onChange, disabled, label, className, id, ref } = props;
	const { root, row, track, trackOn, knob, label: labelStyle, corner, stroke } = useSwitchStyles();
	const [hovering, setHovering] = useState(false);
	const [pressed, setPressed] = useState(false);
	const [focused, setFocused] = useState(false);
	const knobRef = useRef<Frame>();
	const placed = useRef(false);
	const active = canActivate(disabled);
	const pointer = active ? switchPointer(hovering, pressed, focused) : "rest";
	const on = value === true;
	const placement = switchThumbPlacement(on, THUMB_INSET);

	useEffect(() => {
		const thumb = knobRef.current;
		if (!thumb) return;
		const goal = {
			Position: new UDim2(placement.scaleX, placement.offsetX, 0.5, 0),
			AnchorPoint: new Vector2(placement.anchorX, 0.5),
		};
		if (!placed.current) {
			thumb.Position = goal.Position;
			thumb.AnchorPoint = goal.AnchorPoint;
			placed.current = true;
			return;
		}
		const tween = TweenService.Create(thumb, THUMB_TWEEN, goal);
		tween.Play();
		return () => {
			tween.Cancel();
			tween.Destroy();
		};
	}, [placement.scaleX, placement.offsetX, placement.anchorX]);

	return (
		<textbutton
			key={id || "Switch"}
			ref={ref}
			{...root}
			{...className}
			Active={active}
			Selectable={!disabled}
			BackgroundTransparency={focused && active ? 0.85 : 1}
			Event={{
				MouseButton1Click: () => {
					if (active) onChange(!value);
				},
				MouseButton1Down: () => {
					if (active) setPressed(true);
				},
				MouseButton1Up: () => setPressed(false),
				MouseEnter: () => {
					if (active) setHovering(true);
				},
				MouseLeave: () => {
					setHovering(false);
					setPressed(false);
				},
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		>
			<uilistlayout {...row} />
			<frame
				{...cx<Frame>(track, on && trackOn, {
					BackgroundTransparency: switchTrackTransparency(on, disabled === true, pointer),
				})}
				LayoutOrder={1}
			>
				<uicorner {...corner} />
				<uistroke {...cx<UIStroke>(stroke, { Transparency: switchStrokeTransparency(disabled === true, pointer) })} />
				<frame
					ref={knobRef}
					{...cx<Frame>(knob, { BackgroundTransparency: switchThumbTransparency(disabled === true) })}
				>
					<uicorner {...corner} />
				</frame>
			</frame>
			{label !== undefined && (
				<textlabel
					{...labelStyle}
					Text={label}
					TextTransparency={disabled === true ? 0.5 : 0}
					LayoutOrder={2}
				/>
			)}
		</textbutton>
	);
}

export default Switch;
