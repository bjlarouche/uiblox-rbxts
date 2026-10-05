import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { cx, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { Popup } from "ui/packages/popup";
import { ChoiceOption } from "ui/packages/radioGroup";
import { useDragScroll } from "ui/packages/scroll";
import useSelectStyles from "./Select.styles";
import { canFocusGui } from "./selectFocus";
import { shouldHandleSelectKey } from "./selectKey";
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
	const { theme } = useTheme();
	const row = theme.spacing.calc(2);
	const menuHeight = math.min(options.size() * row, theme.spacing.calc(16));
	const active = canActivate(disabled);
	const [anchor, setAnchor] = useState<TextButton>();
	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(false);
	const [highlight, setHighlight] = useState(-1);
	const recent = useRef<{ key: string; at: number }>();
	const onKeyRef = useRef<(input: InputObject, fromControl: boolean) => void>();
	const [listFrame, setListFrame] = useState<ScrollingFrame>();
	const drag = useDragScroll(listFrame);
	const current = options.find((option) => option.value === value);
	const shown = open && active;

	const close = () => {
		setOpen(false);
		if (canFocusGui(anchor)) GuiService.SelectedObject = anchor;
	};

	const openMenu = () => {
		const index = options.findIndex((option) => option.value === value && !option.disabled);
		setHighlight(index >= 0 ? index : stepChoice(options, -1, 1));
		setOpen(true);
	};

	const choose = (index: number, fromPointer = false) => {
		if (fromPointer && drag.suppressClick()) return;
		const choice = options[index];
		if (choice === undefined || choice.disabled) return;
		close();
		if (choice.value !== value) onChange(choice.value);
	};

	const onKey = (input: InputObject, fromControl: boolean) => {
		const now = os.clock();
		if (
			!shouldHandleSelectKey(
				shown,
				focused,
				fromControl,
				UserInputService.GetFocusedTextBox() !== undefined,
				input.KeyCode.Name,
				now,
				recent.current,
			)
		) {
			return;
		}
		recent.current = { key: input.KeyCode.Name, at: now };
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

	onKeyRef.current = onKey;

	useEffect(() => {
		if (!shown && !focused) return;
		const connection = UserInputService.InputBegan.Connect((input) => onKeyRef.current?.(input, false));
		return () => connection.Disconnect();
	}, [shown, focused]);

	useEffect(() => {
		if (!shown || !anchor) return;
		return () => {
			if (canFocusGui(anchor)) GuiService.SelectedObject = anchor;
		};
	}, [shown, anchor]);

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
					SelectionGained: () => setFocused(true),
					SelectionLost: () => setFocused(false),
					InputBegan: (_, input) => onKey(input, true),
				}}
			>
				<uipadding {...styles.padding} />
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
			</textbutton>
			{shown && (
				<Popup anchor={anchor} preferredHeight={menuHeight} onDismiss={close} onInput={(input) => onKey(input, true)}>
					<scrollingframe
						key="Options"
						ref={setListFrame}
						{...styles.list}
						Event={{ InputBegan: (_, input) => onKey(input, true) }}
					>
						<uisizeconstraint {...styles.listSize} />
						<uilistlayout {...styles.layout} />
						<uicorner {...styles.corner} />
						<uistroke {...styles.stroke} />
						{options.map((choice, index) => (
							<textbutton
								key={`${choice.label}-${index}`}
								ref={(button) => {
									if (button && index === highlight && canFocusGui(button)) GuiService.SelectedObject = button;
								}}
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
									Activated: () => choose(index, true),
									MouseEnter: () => {
										if (!choice.disabled) setHighlight(index);
									},
									SelectionGained: () => setHighlight(index),
									InputBegan: (_, input) => onKey(input, true),
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
