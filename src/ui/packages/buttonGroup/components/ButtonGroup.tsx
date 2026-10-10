import React from "@rbxts/react";
import { ControlSize, CustomizedProps, useTheme } from "theme";
import { canActivate } from "ui/packages/button/components/activation";
import { SxHost } from "ui/packages/host";
import { buttonGroupEdge } from "./buttonGroupEdge";
import useButtonGroupStyles from "./ButtonGroup.styles";

export interface ButtonGroupItem {
	label: string;
	disabled?: boolean;
}

export interface ButtonGroupProps {
	items: ButtonGroupItem[];
	onItem?: (index: number) => void;
	disabled?: boolean;
	size?: ControlSize;
	selected?: number;
}

function ButtonGroup(props: CustomizedProps<Frame, ButtonGroupProps>) {
	const { items, onItem, disabled, size, selected, className, sx, id, ref } = props;
	const styles = useButtonGroupStyles({ size });
	const { theme } = useTheme();
	const count = items.size();
	const groupOff = disabled === true;
	return (
		<SxHost tag="frame" key={id || "ButtonGroup"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled: groupOff }}>
			<uicorner {...styles.corner} />
			<uistroke {...styles.stroke} />
			<uilistlayout {...styles.list} />
			<>
				{items.map((item, index) => {
					const off = groupOff || item.disabled === true;
					const active = canActivate(off);
					const picked = !off && index === selected;
					const edge = buttonGroupEdge(index, count);
					const rule = edge === "start" || edge === "middle";
					return (
						<>
							<textbutton
								key={`${item.label}-${index}`}
								{...styles.item}
								Text={item.label}
								TextColor3={picked ? theme.palette.primary.on : theme.palette.text.primary}
								BackgroundColor3={theme.palette.primary.main}
								BackgroundTransparency={picked ? 0 : 1}
								TextTransparency={off ? 0.5 : 0}
								Active={active}
								Selectable={active}
								LayoutOrder={index * 2}
								Event={{
									Activated: () => {
										if (active) onItem?.(index);
									},
								}}
							>
								<uipadding {...styles.pad} />
								{picked && edge !== "middle" && <uicorner {...styles.corner} />}
							</textbutton>
							{rule ? <frame key={`Rule-${index}`} {...styles.rule} LayoutOrder={index * 2 + 1} /> : undefined}
						</>
					);
				})}
			</>
		</SxHost>
	);
}

export default ButtonGroup;
