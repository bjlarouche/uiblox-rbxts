import React from "@rbxts/react";
import { Modal } from "ui/packages/modal";
import useDialogStyles from "./Dialog.styles";

export interface DialogProps {
	host?: Instance;
	open: boolean;
	title?: string;
	onClose: () => void;
	children?: React.ReactNode;
	actions?: React.ReactNode;
}

function Dialog(props: DialogProps) {
	const { host, open, title, onClose, children, actions } = props;
	const styles = useDialogStyles();
	const hasTitle = title !== undefined && title !== "";
	const hasActions = actions !== undefined;
	return (
		<Modal host={host} open={open} onClose={onClose}>
			<frame key="Column" {...styles.column}>
				<uilistlayout {...styles.columnList} />
				{hasTitle && <textlabel key="Title" {...styles.title} Text={title} />}
				<frame key="Body" {...styles.body}>
					{children}
				</frame>
				{hasActions && (
					<frame key="Actions" {...styles.actions}>
						<uilistlayout {...styles.actionList} />
						{actions}
					</frame>
				)}
			</frame>
		</Modal>
	);
}

export default Dialog;
