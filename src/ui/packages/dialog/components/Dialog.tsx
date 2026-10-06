import React from "@rbxts/react";
import { CustomizedProps } from "theme";
import { SxHost } from "ui/packages/host";
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

function Dialog(props: CustomizedProps<Frame, DialogProps>) {
	const { host, open, title, onClose, children, actions, className, sx, id, ref } = props;
	const styles = useDialogStyles();
	const hasTitle = title !== undefined && title !== "";
	const hasActions = actions !== undefined;
	return (
		<Modal host={host} open={open} onClose={onClose}>
			<SxHost
				tag="frame"
				key={id || "Column"}
				hostRef={ref}
				base={styles.column}
				className={className}
				sx={sx}
			>
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
			</SxHost>
		</Modal>
	);
}

export default Dialog;
