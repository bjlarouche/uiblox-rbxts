import React from "@rbxts/react";
import { cx, CustomizedProps } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { ChoiceOption } from "ui/packages/radioGroup";
import { SxHost } from "ui/packages/host";
import useBottomNavigationStyles from "./BottomNavigation.styles";
import { navBadge } from "./navBadge";

export interface BottomNavOption<T> extends ChoiceOption<T> {
	badge?: number;
}

export interface BottomNavigationProps<T> {
	value: T;
	options: BottomNavOption<T>[];
	onChange: (value: T) => void;
	disabled?: boolean;
	showLabels?: boolean;
}

function BottomNavigation<T>(props: CustomizedProps<Frame, BottomNavigationProps<T>>) {
	const { value, options, onChange, disabled, showLabels = true, className, sx, id, ref } = props;
	const styles = useBottomNavigationStyles({ showLabels });
	const count = math.max(options.size(), 1);

	return (
		<SxHost tag="frame" key={id || "BottomNavigation"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.list} />
			<>
			{options.map((choice, index) => {
				const active = canActivate(disabled || choice.disabled);
				const selected = choice.value === value;
				const mark = navBadge(choice.badge);
				return (
					<textbutton
						key={`${choice.label}-${index}`}
						{...cx<TextButton>(styles.item, selected && styles.selected, !active && styles.disabledItem)}
						Size={new UDim2(1 / count, 0, 1, 0)}
						Text={showLabels === false ? "" : choice.label}
						LayoutOrder={index}
						Active={active}
						Selectable={active}
						Event={{
							Activated: () => {
								if (active && choice.value !== value) onChange(choice.value);
							},
						}}
					>
						{selected && <frame key="Indicator" {...styles.indicator} />}
						{mark !== undefined && (
							<textlabel key="Badge" {...styles.badge} Text={mark}>
								<uipadding {...styles.badgePad} />
								<uicorner {...styles.badgeCorner} />
							</textlabel>
						)}
					</textbutton>
				);
			})}
			</>
		</SxHost>
	);
}

export default BottomNavigation;
