import React, { useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useSwitchStyles from "./Switch.styles";

export interface SwitchProps {
	value: boolean;
	onChange: (value: boolean) => void;
	disabled?: boolean;
	label?: string;
}

function Switch(props: CustomizedProps<TextButton, SwitchProps>) {
	const { value, onChange, disabled, label, className, id, ref } = props;
	const { root, row, track, knob, label: labelStyle, corner } = useSwitchStyles(props);
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled);

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
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		>
			<uilistlayout {...row} />
			<frame {...cx<Frame>(track, disabled === true && { BackgroundTransparency: 0.5 })} LayoutOrder={1}>
				<uicorner {...corner} />
				<frame {...knob}>
					<uicorner {...corner} />
				</frame>
			</frame>
			{label !== undefined && (
				<textlabel {...labelStyle} Text={label} TextTransparency={disabled ? 0.5 : 0} LayoutOrder={2} />
			)}
		</textbutton>
	);
}

export default Switch;
