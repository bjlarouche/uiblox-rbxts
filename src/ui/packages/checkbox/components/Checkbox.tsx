import React, { useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useCheckboxStyles from "./Checkbox.styles";
import {
	checkboxBoxTransparency,
	checkboxMark,
	checkboxPointer,
	checkboxStrokeTransparency,
} from "./checkboxLook";
import { nextChecked } from "./nextChecked";

export interface CheckboxProps {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	mixed?: boolean;
	label?: string;
}

function Checkbox(props: CustomizedProps<TextButton, CheckboxProps>) {
	const { value, onChange, disabled, mixed, label, className, id, ref } = props;
	const { root, row, box, mark, label: labelStyle, stroke, corner, fill, activeStroke, idleStroke } =
		useCheckboxStyles();
	const [hovering, setHovering] = useState(false);
	const [pressed, setPressed] = useState(false);
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled);
	const filled = value === true || mixed === true;
	const pointer = active ? checkboxPointer(hovering, pressed, focused) : "rest";
	const boxTransparency = checkboxBoxTransparency(filled, disabled === true, pointer);
	const strokeTransparency = checkboxStrokeTransparency(filled, disabled === true, pointer);

	return (
		<textbutton
			key={id || "Checkbox"}
			ref={ref}
			{...root}
			{...className}
			Active={active}
			Selectable={!disabled}
			BackgroundTransparency={focused && active ? 0.85 : 1}
			Event={{
				MouseButton1Click: () => {
					if (active) onChange(nextChecked(value, mixed));
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
				{...cx<Frame>(box, filled && fill, { BackgroundTransparency: boxTransparency })}
				LayoutOrder={1}
			>
				<uicorner {...corner} />
				<uistroke
					{...cx<UIStroke>(
						stroke,
						filled || pointer === "focus" || pointer === "press" ? activeStroke : idleStroke,
						{ Transparency: strokeTransparency },
					)}
				/>
				<textlabel
					{...mark}
					Text={checkboxMark(value, mixed)}
					TextTransparency={disabled === true ? 0.45 : 0}
				/>
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

export default Checkbox;
