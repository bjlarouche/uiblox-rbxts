import React, { useEffect, useRef } from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { ChoiceOption } from "ui/packages/radioGroup";
import { stepChoice } from "ui/packages/select/components/stepChoice";
import { SxHost } from "ui/packages/host";
import { tabScroll } from "./tabScroll";
import { TabsOrientation, tabsIsVertical } from "./tabsOrientation";
import useTabsStyles from "./Tabs.styles";

export interface TabsProps<T> {
	value: T;
	options: ChoiceOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	orientation?: TabsOrientation;
	centered?: boolean;
}

function Tabs<T>(props: CustomizedProps<ScrollingFrame, TabsProps<T>>) {
	const { value, options, onChange, disabled, orientation, centered, className, sx, id, ref } = props;
	const styles = useTabsStyles({ orientation, centered });
	const vertical = tabsIsVertical(orientation);
	const frame = useRef<ScrollingFrame>();
	const tabs = useRef<TextButton[]>([]);

	const choose = (index: number) => {
		const choice = options[index];
		if (choice !== undefined && canActivate(disabled || choice.disabled) && choice.value !== value) {
			onChange(choice.value);
		}
	};

	useEffect(() => {
		let alive = true;
		const reveal = () => {
			if (!alive) return;
			const host = frame.current;
			if (host === undefined) return;
			const index = options.findIndex((option) => option.value === value);
			const tab = tabs.current[index];
			if (tab === undefined) return;
			const current = vertical ? host.CanvasPosition.Y : host.CanvasPosition.X;
			const origin = vertical ? host.AbsolutePosition.Y : host.AbsolutePosition.X;
			const start = vertical ? tab.AbsolutePosition.Y : tab.AbsolutePosition.X;
			const size = vertical ? tab.AbsoluteSize.Y : tab.AbsoluteSize.X;
			const view = vertical ? host.AbsoluteSize.Y : host.AbsoluteSize.X;
			if (view <= 0) return;
			const scrolled = tabScroll(current, start - (origin - current), size, view);
			if (math.abs(scrolled - current) < 1) return;
			host.CanvasPosition = vertical ? new Vector2(host.CanvasPosition.X, scrolled) : new Vector2(scrolled, host.CanvasPosition.Y);
		};
		// Next frame. A deferred scroll write runs inside this effect flush and re-enters render.
		task.delay(0, reveal);
		return () => {
			alive = false;
		};
	}, [value, vertical, options.size()]);

	const onKey = (_: GuiObject, input: InputObject) => {
		const index = options.findIndex((option) => option.value === value);
		const back = vertical ? Enum.KeyCode.Up : Enum.KeyCode.Left;
		const forward = vertical ? Enum.KeyCode.Down : Enum.KeyCode.Right;
		if (input.KeyCode === back) choose(stepChoice(options, index, -1));
		else if (input.KeyCode === forward) choose(stepChoice(options, index, 1));
	};

	return (
		<SxHost
			tag="scrollingframe"
			key={id || "Tabs"}
			hostRef={(instance) => {
				frame.current = instance as ScrollingFrame | undefined;
				if (ref === undefined) return;
				if (typeIs(ref, "function")) (ref as (value: ScrollingFrame | undefined) => void)(instance as ScrollingFrame);
				else (ref as { current?: ScrollingFrame }).current = instance as ScrollingFrame;
			}}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled }}
		>
			<uilistlayout {...styles.list} />
			<>
			{options.map((choice, index) => {
				const active = canActivate(disabled || choice.disabled);
				const selected = choice.value === value;
				return (
					<textbutton
						key={`${choice.label}-${index}`}
						{...cx<TextButton>(styles.tab, selected && styles.selected, !active && styles.disabledTab)}
						Text={choice.label}
						LayoutOrder={index}
						ref={(rbx) => {
							if (rbx !== undefined) tabs.current[index] = rbx;
						}}
						Active={active}
						Selectable={active}
						Event={{ Activated: () => choose(index), InputBegan: onKey }}
					>
						<uipadding {...styles.padding} />
						<uisizeconstraint {...styles.cap} />
						{selected && <frame key="Indicator" {...styles.indicator} />}
					</textbutton>
				);
			})}
			</>
		</SxHost>
	);
}

export default Tabs;
