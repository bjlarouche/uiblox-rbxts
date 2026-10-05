import React from "@rbxts/react";
import useListItemStyles from "./ListItem.styles";

export interface ListItemProps {
	text: string;
	secondary?: string;
	selected?: boolean;
	disabled?: boolean;
	onActivated?: () => void;
}

function ListItem(props: ListItemProps) {
	const { text, secondary, selected = false, disabled = false, onActivated } = props;
	const styles = useListItemStyles({ selected, disabled });
	return (
		<textbutton
			key="ListItem"
			{...styles.root}
			Event={{
				Activated: () => {
					if (!disabled && onActivated !== undefined) onActivated();
				},
			}}
		>
			<uipadding {...styles.padding} />
			<uilistlayout {...styles.list} />
			<textlabel key="Primary" {...styles.primary} Text={text} />
			{secondary !== undefined && secondary.size() > 0 ? (
				<textlabel key="Secondary" {...styles.secondary} Text={secondary} />
			) : undefined}
		</textbutton>
	);
}

export default ListItem;
