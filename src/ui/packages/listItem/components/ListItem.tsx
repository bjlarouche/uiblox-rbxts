import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
import useListItemStyles from "./ListItem.styles";

export interface ListItemProps {
	text: string;
	secondary?: string;
	selected?: boolean;
	disabled?: boolean;
	dense?: boolean;
	divider?: boolean;
	wrap?: boolean;
	onActivated?: () => void;
}

function ListItem(props: CustomizedProps<TextButton, ListItemProps>) {
	const { text, secondary, selected = false, disabled = false, dense = false, divider = false, wrap = false, onActivated, className, sx, id, ref } =
		props;
	const styles = useListItemStyles({ selected, disabled, dense, wrap });
	return (
		<SxHost
			tag="textbutton"
			key={id || "ListItem"}
			hostRef={ref}
			base={styles.root}
			className={className}
			sx={sx}
			state={{ disabled, selected }}
			Text=""
			Active={!disabled}
			Selectable={!disabled}
			AutoButtonColor={false}
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
			{divider === true ? <frame key="Divider" {...styles.divider} /> : undefined}
		</SxHost>
	);
}

export default ListItem;
