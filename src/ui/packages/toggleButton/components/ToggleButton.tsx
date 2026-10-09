import React, { useState } from "@rbxts/react";
import { ControlSize, controlFade, CustomizedProps, focusRing, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
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
	const { theme } = useTheme();
	const active = canActivate(disabled);
	const [hovering, setHovering] = useState(false);
	const [focused, setFocused] = useState(false);
	const face = selected === true ? theme.palette.action.selected : hovering && active ? theme.palette.action.hover : theme.palette.surface.input;
	return (
		<SxHost
			tag="textbutton"
			key={id || "ToggleButton"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, selected, hover: hovering, focused }}
			Text={label}
			Active={active}
			Selectable={active}
			BackgroundColor3={face}
			BackgroundTransparency={disabled === true ? controlFade : 0}
			Event={{
				Activated: () => {
					if (active) onActivated?.();
				},
				MouseEnter: () => {
					if (active) setHovering(true);
				},
				MouseLeave: () => setHovering(false),
				SelectionGained: () => {
					if (active) setFocused(true);
				},
				SelectionLost: () => setFocused(false),
			}}
		>
			<uipadding {...styles.padding} />
			<uicorner {...styles.corner} />
			{focused && active ? <uistroke {...focusRing(theme.palette.focus)} /> : <uistroke {...styles.stroke} />}
		</SxHost>
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
		<SxHost tag="frame" key={id || "ToggleButtonGroup"} hostRef={ref} base={styles.group} className={className} sx={sx} state={{ disabled }}>
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
		</SxHost>
	);
}

export default ToggleButton;
