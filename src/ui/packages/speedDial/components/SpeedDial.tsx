import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { Fab } from "ui/packages/fab";
import useSpeedDialStyles, { SpeedDialDirection } from "./SpeedDial.styles";

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
	direction?: SpeedDialDirection;
}

function SpeedDial(props: CustomizedProps<Frame, SpeedDialProps>) {
	const {
		open,
		onOpenChange,
		actions,
		icon = Icons.OpenBox,
		openIcon = Icons.Close,
		disabled,
		direction = "up",
		className,
		sx,
		id,
		ref,
	} = props;
	const styles = useSpeedDialStyles({ direction });
	const mainFirst = direction === "down" || direction === "right";
	const mainOrder = mainFirst ? 0 : 1000;
	const actionBase = mainFirst ? 1 : 0;
	return (
		<frame key={id || "SpeedDial"} ref={ref} {...styles.root} {...className} {...sx}>
			<uilistlayout {...styles.list} />
			{open && (
				<>
				{actions.map((action, index) => (
					<Fab
						key={`Action-${index}`}
						icon={action.icon}
						size="small"
						disabled={disabled === true || action.disabled === true}
						onClick={() => {
							action.onClick?.();
							onOpenChange(false);
						}}
						className={{ LayoutOrder: actionBase + index }}
					/>
				))}
				</>
			)}
			<Fab
				key="Main"
				icon={open ? openIcon : icon}
				disabled={disabled}
				onClick={() => onOpenChange(!open)}
				className={{ LayoutOrder: mainOrder }}
			/>
		</frame>
	);
}

export default SpeedDial;
