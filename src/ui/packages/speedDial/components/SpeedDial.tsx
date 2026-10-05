import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { Fab } from "ui/packages/fab";
import useSpeedDialStyles from "./SpeedDial.styles";

export interface SpeedDialAction {
	icon: Icons;
	disabled?: boolean;
	onClick?: () => void;
}

export interface SpeedDialProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	actions: SpeedDialAction[];
	icon?: Icons;
	openIcon?: Icons;
	disabled?: boolean;
}

function SpeedDial(props: CustomizedProps<Frame, SpeedDialProps>) {
	const {
		open,
		onOpenChange,
		actions,
		icon = Icons.OpenBox,
		openIcon = Icons.Close,
		disabled,
		className,
		sx,
		id,
		ref,
	} = props;
	const styles = useSpeedDialStyles();
	return (
		<frame key={id || "SpeedDial"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{open &&
				actions.map((action, index) => (
					<Fab
						key={`Action-${index}`}
						icon={action.icon}
						size="small"
						disabled={disabled === true || action.disabled === true}
						onClick={() => {
							action.onClick?.();
							onOpenChange(false);
						}}
						className={{ LayoutOrder: index }}
					/>
				))}
			<Fab
				key="Main"
				icon={open ? openIcon : icon}
				disabled={disabled}
				onClick={() => onOpenChange(!open)}
				className={{ LayoutOrder: 1000 }}
			/>
		</frame>
	);
}

export default SpeedDial;
