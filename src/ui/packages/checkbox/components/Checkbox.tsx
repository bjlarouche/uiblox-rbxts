import React, { useState } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import useCheckboxStyles from "./Checkbox.styles";
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
	const { root, row, box, mark, label: labelStyle, stroke } = useCheckboxStyles();
	const [focused, setFocused] = useState(false);
	const active = canActivate(disabled);

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
				SelectionGained: () => setFocused(true),
				SelectionLost: () => setFocused(false),
			}}
		>
			<uilistlayout {...row} />
			<frame
				{...cx<Frame>(
					box,
					(value || mixed) && { BackgroundTransparency: disabled ? 0.5 : 0 },
					(!value && !mixed) && { BackgroundTransparency: 1 },
				)}
				LayoutOrder={1}
			>
				<uistroke {...stroke} Transparency={disabled ? 0.5 : focused ? 0 : 0.4} />
				<textlabel {...mark} Text={mixed ? "-" : value ? "X" : ""} />
			</frame>
			{label !== undefined && <textlabel {...labelStyle} Text={label} TextTransparency={disabled ? 0.5 : 0} LayoutOrder={2} />}
		</textbutton>
	);
}

export default Checkbox;
