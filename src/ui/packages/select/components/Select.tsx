import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiService, UserInputService } from "@rbxts/services";
import { useReducedMotion } from "hooks";
import { controlMetrics, ControlSize, cx, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { spinnerPixels } from "ui/packages/button/components/buttonLook";
import { CircularProgress } from "ui/packages/circularProgress";
import { Input } from "ui/packages/input";
import { Popup } from "ui/packages/popup";
import { ChoiceOption } from "ui/packages/radioGroup";
import { Shadow } from "ui/packages/shadow";
import { EmptyListHint, VirtualList, VirtualListHandle } from "ui/packages/virtualList";
import useSelectStyles from "./Select.styles";
import { optionLabel } from "./optionLabel";
import { filterChoices, usesSelectSearch } from "./selectFilter";
import { canFocusGui } from "./selectFocus";
import { groupRows, rowForOption } from "./selectGroups";
import { shouldHandleSelectKey } from "./selectKey";
import { includesChoice, selectionLabel } from "./selectMulti";
import { typeaheadChoice } from "./selectTypeahead";
import { stepChoice } from "./stepChoice";

export interface SelectProps<T> {
	value: T;
	values?: ReadonlyArray<T>;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	loading?: boolean;
	placeholder?: string;
	searchable?: boolean;
	defaultOpen?: boolean;
	defaultQuery?: string;
	emptyText?: string;
	empty?: React.Element;
	reducedMotion?: boolean;
	size?: ControlSize;
}

function Select<T>(props: CustomizedProps<Frame, SelectProps<T>>) {
	const { value, values, options, onChange, disabled, loading = false, placeholder = "", searchable, defaultOpen, defaultQuery, emptyText, empty, reducedMotion: reducedProp, size, className,
		sx, id, ref } = props;
	const reducedMotion = useReducedMotion(reducedProp);
	const styles = useSelectStyles({ size });
	const { theme } = useTheme();
	const row = controlMetrics(theme.density, size).height;
	const active = canActivate(disabled, loading);
	const [anchor, setAnchor] = useState<TextButton>();
	const [open, setOpen] = useState(defaultOpen === true && !loading);
	const [focused, setFocused] = useState(false);
	const [highlight, setHighlight] = useState(-1);
	const [query, setQuery] = useState(defaultQuery ?? "");
	const recent = useRef<{ key: string; at: number }>();
	const typed = useRef<{ text: string; at: number }>();
	const onKeyRef = useRef<(input: InputObject, fromControl: boolean) => void>();
	const listRef = useRef<VirtualListHandle>();
	const current = options.find((option) => option.value === value);
	const shown = open && active;
	const search = usesSelectSearch(options.size(), searchable);
	const filtered = filterChoices(options, query);
	const rows = groupRows(filtered);
	const listHeight = rows.size() === 0 ? row : math.min(rows.size() * row, theme.spacing.calc(16));
	const menuHeight = listHeight + (search ? row : 0);
	const emptyHint =
		empty ?? (
			<EmptyListHint
				text={emptyText ?? (query.size() > 0 || options.size() > 0 ? "No results" : "No options")}
				height={row}
			/>
		);

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
		if (values === undefined) {
			close();
			if (choice.value !== value) onChange(choice.value);
			return;
		}
		onChange(choice.value);
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
		} else if (key.Name.size() === 1) {
			const letter = key.Name.lower();
			const previous = typed.current;
			const text = previous !== undefined && now - previous.at < 0.5 ? `${previous.text}${letter}` : letter;
			typed.current = { text, at: now };
			setHighlight(typeaheadChoice(filtered, highlight, text));
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
		listRef.current?.ensureVisible(rowForOption(rows, highlight));
	}, [shown, highlight]);

	useEffect(() => {
		if (loading && open) {
			setOpen(false);
			setQuery("");
		}
	}, [loading, open]);

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
				Text={values !== undefined ? selectionLabel(options, values, placeholder) : (current?.label ?? placeholder)}
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
				<uipadding
					{...cx<UIPadding>(
						styles.padding,
						loading && { PaddingRight: new UDim(0, theme.padding.calc(1.5) + spinnerPixels(size) + theme.padding.calc(1)) },
					)}
				/>
				<uicorner {...styles.corner} />
				<uistroke {...cx<UIStroke>(styles.stroke, focused && styles.focusStroke)} />
				{loading && (
					<CircularProgress
						size={spinnerPixels(size)}
						thickness={2}
						color={theme.palette.text.secondary}
						reducedMotion={reducedMotion}
						className={{
							AnchorPoint: new Vector2(1, 0.5),
							Position: new UDim2(1, -theme.padding.calc(1), 0.5, 0),
						}}
					/>
				)}
			</textbutton>
			{shown && (
				<Popup anchor={anchor} preferredHeight={menuHeight} onDismiss={close} onInput={(input) => onKey(input, true)}>
					<frame key="Menu" {...styles.menu}>
						<Shadow />
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
								items={rows}
								getKey={(row, index) => `${row.kind}-${row.label}-${index}`}
								itemHeight={row}
								listRef={listRef}
								empty={emptyHint}
								className={styles.list}
								renderItem={(row) => {
									if (row.kind === "header") {
										return (
											<textlabel {...styles.group} Text={row.label}>
												<uipadding {...styles.padding} />
											</textlabel>
										);
									}
									const index = row.optionIndex;
									const picked =
										values !== undefined
											? includesChoice(values, filtered[index].value)
											: filtered[index].value === value;
									return (
										<textbutton
											ref={(button) => {
												if (button && index === highlight && canFocusGui(button)) GuiService.SelectedObject = button;
											}}
											{...cx<TextButton>(
												styles.option,
												picked && styles.selected,
												index === highlight && styles.highlighted,
												row.disabled === true && styles.disabledOption,
											)}
											Text={optionLabel(row.label, picked)}
											Active={row.disabled !== true}
											Selectable={row.disabled !== true}
											Event={{
												Activated: () => choose(index, true),
												MouseEnter: () => {
													if (row.disabled !== true) setHighlight(index);
												},
												SelectionGained: () => setHighlight(index),
												InputBegan: (_, input) => onKey(input, true),
											}}
										>
											<uipadding {...styles.padding} />
										</textbutton>
									);
								}}
							/>
						</frame>
					</frame>
				</Popup>
			)}
		</frame>
	);
}

export default Select;
