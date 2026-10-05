import React from "@rbxts/react";
import { ListItem } from "ui/packages/listItem";
import { Popup } from "ui/packages/popup";
import useMenuStyles from "./Menu.styles";

const ROW = 28;

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
}

function Menu(props: MenuProps) {
	const { anchor, open, items, onSelect, onClose } = props;
	const styles = useMenuStyles();
	if (!open) return undefined;
	return (
		<Popup anchor={anchor} preferredHeight={items.size() * ROW} onDismiss={onClose}>
			<frame key="Surface" {...styles.surface}>
				<uicorner {...styles.corner} />
				<uilistlayout {...styles.list} />
				{items.map((item) => (
					<ListItem
						key={item.id}
						text={item.text}
						disabled={item.disabled}
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
