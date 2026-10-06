import React from "@rbxts/react";
import { ControlSize, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { ChoiceOption } from "ui/packages/radioGroup";
import useToggleButtonStyles, { ToggleButtonOrientation } from "./ToggleButton.styles";

export interface ToggleButtonProps {
	label: string;
	selected?: boolean;
	disabled?: boolean;
	size?: ControlSize;
	onActivated?: () => void;
}

function ToggleButton(props: CustomizedProps<TextButton, ToggleButtonProps>) {
	const { label, selected, disabled, size = "medium", onActivated, className, sx, id, ref } = props;
	const styles = useToggleButtonStyles({ selected, disabled, size });
	const active = canActivate(disabled);
	return (
		<textbutton
			key={id || "ToggleButton"}
			ref={ref}
			{...styles.root}
			{...className}
			{...sx}
			Text={label}
			Active={active}
			Selectable={active}
			Event={{
				Activated: () => {
					if (active) onActivated?.();
				},
			}}
		>
			<uipadding {...styles.padding} />
			<uicorner {...styles.corner} />
			<uistroke {...styles.stroke} />
		</textbutton>
	);
}

export interface ToggleButtonGroupProps<T> {
	value: T;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	size?: ControlSize;
	orientation?: ToggleButtonOrientation;
}

export function ToggleButtonGroup<T>(props: CustomizedProps<Frame, ToggleButtonGroupProps<T>>) {
	const { value, options, onChange, disabled, size, orientation, className, sx, id, ref } = props;
	const styles = useToggleButtonStyles({ size, orientation });
	return (
		<frame key={id || "ToggleButtonGroup"} ref={ref} {...styles.group} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			<>
			{options.map((choice, index) => (
				<ToggleButton
					key={`${choice.label}-${index}`}
					label={choice.label}
					selected={choice.value === value}
					disabled={disabled === true || choice.disabled === true}
					size={size}
					onActivated={() => {
						if (choice.value !== value) onChange(choice.value);
					}}
					className={{ LayoutOrder: index }}
				/>
			))}
			</>
		</frame>
	);
}

export default ToggleButton;
