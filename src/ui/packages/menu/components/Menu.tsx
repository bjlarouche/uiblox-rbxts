import React from "@rbxts/react";
import { ListItem } from "ui/packages/listItem";
import { Popup } from "ui/packages/popup";
import { EmptyListHint } from "ui/packages/virtualList";
import useMenuStyles from "./Menu.styles";

const ROW = 28;
const ROW_DENSE = 22;

export interface MenuItem {
	id: string;
	text: string;
	disabled?: boolean;
}

export interface MenuProps {
	anchor?: GuiObject;
	open: boolean;
	items: MenuItem[];
	onSelect: (id: string) => void;
	onClose: () => void;
	emptyText?: string;
	empty?: React.Element;
	dense?: boolean;
	selected?: string;
}

function Menu(props: MenuProps) {
	const { anchor, open, items, onSelect, onClose, emptyText, empty, dense, selected } = props;
	const styles = useMenuStyles();
	if (!open) return undefined;
	const vacant = items.size() === 0;
	const row = dense === true ? ROW_DENSE : ROW;
	const height = vacant ? row : items.size() * row;
	return (
		<Popup anchor={anchor} preferredHeight={height} onDismiss={onClose}>
			<frame key="Surface" {...styles.surface}>
				<uicorner {...styles.corner} />
				<uistroke {...styles.stroke} />
				<uilistlayout {...styles.list} />
				{vacant
					? (empty ?? <EmptyListHint text={emptyText ?? "No options"} height={row} />)
					: items.map((item) => (
							<ListItem
								key={item.id}
								text={item.text}
								disabled={item.disabled}
								dense={dense}
								selected={item.id === selected}
								onActivated={() => {
									if (item.disabled === true) return;
									onSelect(item.id);
									onClose();
								}}
							/>
						))}
			</frame>
		</Popup>
	);
}

export default Menu;
