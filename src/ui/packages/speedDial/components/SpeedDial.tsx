import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { Icons } from "ui/enums";
import { Fab } from "ui/packages/fab";
import { SxHost } from "ui/packages/host";
import useSpeedDialStyles, { SpeedDialDirection } from "./SpeedDial.styles";
import { speedDialLabel, speedDialLabelFirst } from "./speedDialLabel";

export interface SpeedDialAction {
	icon: Icons;
	label?: string;
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
	const labeled = actions.some((action) => speedDialLabel(action.label) !== undefined);
	const styles = useSpeedDialStyles({ direction, labeled });
	const labelFirst = speedDialLabelFirst(direction);
	const mainFirst = direction === "down" || direction === "right";
	const mainOrder = mainFirst ? 0 : 1000;
	const actionBase = mainFirst ? 1 : 0;
	return (
		<SxHost tag="frame" key={id || "SpeedDial"} hostRef={ref} base={styles.root} className={className} sx={sx} state={{ disabled }}>
			<uilistlayout {...styles.list} />
			{open && (
				<>
				{actions.map((action, index) => {
					const name = speedDialLabel(action.label);
					const order = actionBase + index;
					const button = (
						<Fab
							key={name === undefined ? `Action-${index}` : "Action"}
							icon={action.icon}
							size="small"
							disabled={disabled === true || action.disabled === true}
							onClick={() => {
								action.onClick?.();
								onOpenChange(false);
							}}
							className={{ LayoutOrder: name === undefined ? order : labelFirst ? 2 : 1 }}
						/>
					);
					if (name === undefined) return button;
					return (
						<frame key={`Action-${index}`} {...styles.action} LayoutOrder={order}>
							<uilistlayout {...styles.actionRow} />
							<textlabel key="Label" {...styles.actionLabel} Text={name} LayoutOrder={labelFirst ? 1 : 2}>
								<uipadding {...styles.actionPad} />
								<uicorner {...styles.actionCorner} />
								<uisizeconstraint {...styles.actionCap} />
							</textlabel>
							{button}
						</frame>
					);
				})}
				</>
			)}
			<Fab
				key="Main"
				icon={open ? openIcon : icon}
				disabled={disabled}
				onClick={() => onOpenChange(!open)}
				className={{ LayoutOrder: mainOrder }}
			/>
		</SxHost>
	);
}

export default SpeedDial;
