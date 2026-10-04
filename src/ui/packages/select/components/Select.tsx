import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiService } from "@rbxts/services";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { Popup } from "ui/packages/popup";
import { ChoiceOption } from "ui/packages/radioGroup";
import useSelectStyles from "./Select.styles";
import { stepChoice } from "./stepChoice";

export interface SelectProps<T> {
	value: T;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	placeholder?: string;
}

function Select<T>(props: CustomizedProps<Frame, SelectProps<T>>) {
	const { value, options, onChange, disabled, placeholder = "", className, id, ref } = props;
	const styles = useSelectStyles();
	const active = canActivate(disabled);
	const [anchor, setAnchor] = useState<TextButton>();
	const [open, setOpen] = useState(false);
	const [highlight, setHighlight] = useState(-1);
	const highlighted = useRef<TextButton>();
	const current = options.find((option) => option.value === value);
	const shown = open && active;

	useEffect(() => {
		if (shown && anchor && highlighted.current && GuiService.SelectedObject === anchor) {
			GuiService.SelectedObject = highlighted.current;
		}
	}, [shown]);

	const openMenu = () => {
		const index = options.findIndex((option) => option.value === value && !option.disabled);
		setHighlight(index >= 0 ? index : stepChoice(options, -1, 1));
		setOpen(true);
	};

	const close = () => {
		setOpen(false);
		if (anchor && GuiService.SelectedObject !== undefined) GuiService.SelectedObject = anchor;
	};

	const choose = (index: number) => {
		const choice = options[index];
		if (choice === undefined || choice.disabled) return;
		close();
		if (choice.value !== value) onChange(choice.value);
	};

	const onKey = (_: GuiObject, input: InputObject) => {
		const key = input.KeyCode;
		if (!shown) {
			if (active && key === Enum.KeyCode.Down) openMenu();
		} else if (key === Enum.KeyCode.Up) {
			setHighlight(stepChoice(options, highlight, -1));
		} else if (key === Enum.KeyCode.Down) {
			setHighlight(stepChoice(options, highlight, 1));
		} else if (key === Enum.KeyCode.Return || key === Enum.KeyCode.KeypadEnter) {
			choose(highlight);
		} else if (key === Enum.KeyCode.Escape || key === Enum.KeyCode.ButtonB) {
			close();
		}
	};

	return (
		<frame key={id || "Select"} ref={ref} {...styles.root} {...className}>
			<textbutton
				key="Trigger"
				ref={setAnchor}
				{...cx<TextButton>(
					styles.trigger,
					current === undefined && styles.placeholder,
					!active && { TextTransparency: 0.5 },
				)}
				Text={current?.label ?? placeholder}
				Active={active}
				Selectable={active}
				Event={{
					Activated: () => {
						if (shown) close();
						else if (active) openMenu();
					},
					InputBegan: onKey,
				}}
			>
				<uipadding {...styles.padding} />
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
			</textbutton>
			{shown && (
				<Popup anchor={anchor} onDismiss={close}>
					<scrollingframe key="Options" {...styles.list} Event={{ InputBegan: onKey }}>
						<uisizeconstraint {...styles.listSize} />
						<uilistlayout {...styles.layout} />
						<uicorner {...styles.corner} />
						<uistroke {...styles.stroke} />
						{options.map((choice, index) => (
							<textbutton
								key={`${choice.label}-${index}`}
								ref={index === highlight ? highlighted : undefined}
								{...cx<TextButton>(
									styles.option,
									index === highlight && styles.highlighted,
									choice.disabled === true && styles.disabledOption,
								)}
								Text={choice.label}
								LayoutOrder={index}
								Active={!choice.disabled}
								Selectable={!choice.disabled}
								Event={{
									Activated: () => choose(index),
									MouseEnter: () => {
										if (!choice.disabled) setHighlight(index);
									},
									SelectionGained: () => setHighlight(index),
									InputBegan: onKey,
								}}
							>
								<uipadding {...styles.padding} />
							</textbutton>
						))}
					</scrollingframe>
				</Popup>
			)}
		</frame>
	);
}

export default Select;
