import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { controlMetrics, ControlSize, cx, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { Input } from "ui/packages/input";
import { Popup } from "ui/packages/popup";
import { ChoiceOption } from "ui/packages/radioGroup";
import { VirtualList, VirtualListHandle } from "ui/packages/virtualList";
import useSelectStyles from "./Select.styles";
import { filterChoices, usesSelectSearch } from "./selectFilter";
import { canFocusGui } from "./selectFocus";
import { shouldHandleSelectKey } from "./selectKey";
import { stepChoice } from "./stepChoice";

export interface SelectProps<T> {
	value: T;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	placeholder?: string;
	searchable?: boolean;
	size?: ControlSize;
}

function Select<T>(props: CustomizedProps<Frame, SelectProps<T>>) {
	const { value, options, onChange, disabled, placeholder = "", searchable, size, className,
		sx, id, ref } = props;
	const styles = useSelectStyles({ size });
	const { theme } = useTheme();
	const row = controlMetrics(theme.density, size).height;
	const active = canActivate(disabled);
	const [anchor, setAnchor] = useState<TextButton>();
	const [open, setOpen] = useState(false);
	const [focused, setFocused] = useState(false);
	const [highlight, setHighlight] = useState(-1);
	const [query, setQuery] = useState("");
	const recent = useRef<{ key: string; at: number }>();
	const onKeyRef = useRef<(input: InputObject, fromControl: boolean) => void>();
	const listRef = useRef<VirtualListHandle>();
	const current = options.find((option) => option.value === value);
	const shown = open && active;
	const search = usesSelectSearch(options.size(), searchable);
	const filtered = filterChoices(options, query);
	const menuHeight = math.min(filtered.size() * row, theme.spacing.calc(16)) + (search ? row : 0);

	const close = () => {
		setOpen(false);
		setQuery("");
		if (canFocusGui(anchor)) GuiService.SelectedObject = anchor;
	};

	const openMenu = () => {
		setQuery("");
		const index = options.findIndex((option) => option.value === value && !option.disabled);
		setHighlight(index >= 0 ? index : stepChoice(options, -1, 1));
		setOpen(true);
	};

	const choose = (index: number, fromPointer = false) => {
		if (fromPointer && listRef.current?.suppressClick()) return;
		const choice = filtered[index];
		if (choice === undefined || choice.disabled) return;
		close();
		if (choice.value !== value) onChange(choice.value);
	};

	const onKey = (input: InputObject, fromControl: boolean) => {
		const now = os.clock();
		if (shown && (input.KeyCode === Enum.KeyCode.Escape || input.KeyCode === Enum.KeyCode.ButtonB)) {
			close();
			return;
		}
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
			setHighlight(stepChoice(filtered, highlight, -1));
		} else if (key === Enum.KeyCode.Down) {
			setHighlight(stepChoice(filtered, highlight, 1));
		} else if (key === Enum.KeyCode.Return || key === Enum.KeyCode.KeypadEnter) {
			choose(highlight);
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

	useEffect(() => {
		if (!shown || highlight < 0) return;
		listRef.current?.ensureVisible(highlight);
	}, [shown, highlight]);

	return (
		<frame key={id || "Select"} ref={ref} {...styles.root} {...className} {...sx}>
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
					<frame key="Menu" {...styles.menu}>
						<uicorner {...styles.corner} />
						<uistroke {...styles.stroke} />
						<uilistlayout FillDirection={Enum.FillDirection.Vertical} SortOrder={Enum.SortOrder.LayoutOrder} />
						{search && (
							<frame key="Search" {...styles.search} LayoutOrder={1}>
								<Input
									text={query}
									placeholder="Search"
									width={new UDim(1, 0)}
									onInput={(text) => {
										setQuery(text);
										setHighlight(0);
									}}
								/>
							</frame>
						)}
						<frame
							key="ListHost"
							Size={new UDim2(1, 0, 1, search ? -row : 0)}
							BackgroundTransparency={1}
							LayoutOrder={2}
						>
							<VirtualList
								key="Options"
								items={filtered}
								getKey={(choice, index) => `${choice.label}-${index}`}
								itemHeight={row}
								listRef={listRef}
								className={styles.list}
								renderItem={(choice, index) => (
									<textbutton
										ref={(button) => {
											if (button && index === highlight && canFocusGui(button)) GuiService.SelectedObject = button;
										}}
										{...cx<TextButton>(
											styles.option,
											index === highlight && styles.highlighted,
											choice.disabled === true && styles.disabledOption,
										)}
										Text={choice.label}
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
								)}
							/>
						</frame>
					</frame>
				</Popup>
			)}
		</frame>
	);
}

export default Select;
