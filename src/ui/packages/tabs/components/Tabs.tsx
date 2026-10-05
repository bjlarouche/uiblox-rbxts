import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { ChoiceOption } from "ui/packages/radioGroup";
import { stepChoice } from "ui/packages/select/components/stepChoice";
import { TabsOrientation, tabsIsVertical } from "./tabsOrientation";
import useTabsStyles from "./Tabs.styles";

export interface TabsProps<T> {
	value: T;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	orientation?: TabsOrientation;
}

function Tabs<T>(props: CustomizedProps<ScrollingFrame, TabsProps<T>>) {
	const { value, options, onChange, disabled, orientation, className, sx, id, ref } = props;
	const styles = useTabsStyles({ orientation });
	const vertical = tabsIsVertical(orientation);

	const choose = (index: number) => {
		const choice = options[index];
		if (choice !== undefined && canActivate(disabled || choice.disabled) && choice.value !== value) {
			onChange(choice.value);
		}
	};

	const onKey = (_: GuiObject, input: InputObject) => {
		const index = options.findIndex((option) => option.value === value);
		const back = vertical ? Enum.KeyCode.Up : Enum.KeyCode.Left;
		const forward = vertical ? Enum.KeyCode.Down : Enum.KeyCode.Right;
		if (input.KeyCode === back) choose(stepChoice(options, index, -1));
		else if (input.KeyCode === forward) choose(stepChoice(options, index, 1));
	};

	return (
		<scrollingframe key={id || "Tabs"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{options.map((choice, index) => {
				const active = canActivate(disabled || choice.disabled);
				const selected = choice.value === value;
				return (
					<textbutton
						key={`${choice.label}-${index}`}
						{...cx<TextButton>(styles.tab, selected && styles.selected, !active && styles.disabledTab)}
						Text={choice.label}
						LayoutOrder={index}
						Active={active}
						Selectable={active}
						Event={{ Activated: () => choose(index), InputBegan: onKey }}
					>
						<uipadding {...styles.padding} />
						{selected && <frame key="Indicator" {...styles.indicator} />}
					</textbutton>
				);
			})}
		</scrollingframe>
	);
}

export default Tabs;
